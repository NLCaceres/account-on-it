<?php

namespace Tests\Feature\Policies;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Policies\LandlordPolicy;
use App\Models\Landlord;
use App\Models\Tenant;
use App\Models\User;
use Tests\Helpers\PoliciesTestInterface;
use Tests\TestCase;

class LandlordPolicyTest extends TestCase implements PoliciesTestInterface
{
    /**
     * A basic feature test example.
     *
     *
     * @return void
     */
    public function testViewAny()
    {
        //* Pattern: Normal Users can not view the whole list of users. ONLY Admins can.
        $policy = new LandlordPolicy();

        $canNotViewAsLandlordUser = $policy->viewAny(User::factory()->landlords()->create());
        $this->assertFalse($canNotViewAsLandlordUser);

        $canNotViewAsTenantUser = $policy->viewAny(User::factory()->tenants()->create());
        $this->assertFalse($canNotViewAsTenantUser);

        $canViewAnyAsAdmin = $policy->viewAny(User::factory()->admins()->create());
        $this->assertTrue($canViewAnyAsAdmin);
    }

    public function testView() 
    {
        //* Pattern: Landlord users can view themselves! Their tenants can too. No one else. Admins can view anyone
        $policy = new LandlordPolicy();

        $landlordUser = User::factory()->landlords()->create();
        $randomLandlord = Landlord::factory()->create();
        $canNotViewAsAnyLandlordUser = $policy->view($landlordUser, $randomLandlord);
        $this->assertFalse($canNotViewAsAnyLandlordUser);

        $tenantUser = User::factory()->tenants()->create();
        $canNotViewAsTenantUser = $policy->view($tenantUser, $randomLandlord);
        $this->assertFalse($canNotViewAsTenantUser);

        $landlordUser->landlord()->save($randomLandlord); //* Associate landlord user with landlord model
        $canViewSelfAsLandlordUser = $policy->view($landlordUser, $randomLandlord);
        $this->assertTrue($canViewSelfAsLandlordUser);

        //* Associate Tenant user's tenant model with landlord
        $tenantUser->tenant()->save(Tenant::factory()->make(['landlord_id'=>$randomLandlord->id])); 
        $tenantUser->refresh(); //* Makes sure relationship is loaded in correctly (i.e. in the policy here)
        $canViewLandlordItBelongsTo = $policy->view($tenantUser, $randomLandlord);
        $this->assertTrue($canViewLandlordItBelongsTo);

        $adminUser = User::factory()->admins()->create();
        $canViewAsAdmin = $policy->view($adminUser, $randomLandlord);
        $this->assertTrue($canViewAsAdmin);
    }

    public function testCreate() 
    {
        //* Pattern: Normal Users can't make users! Only register themselves elsewhere. Only Admins can use this route! 
        $policy = new LandlordPolicy();
        $landlordUser = User::factory()->landlords()->create();
        $canNotCreateAsLandlordUser = $policy->create($landlordUser);
        $this->assertFalse($canNotCreateAsLandlordUser);

        $tenantUser = User::factory()->tenants()->create(); //* Tenant user can't create either
        $canNotCreateAsTenantUser = $policy->create($tenantUser);
        $this->assertFalse($canNotCreateAsTenantUser);

        $canCreateAsAdmin = $policy->create(User::factory()->admins()->create());
        $this->assertTrue($canCreateAsAdmin);
    }

    public function testUpdate() 
    {
        //* Pattern: Landlord Users can update their own info. No one else. Admins can update anyone
        $policy = new LandlordPolicy();

        $landlordUser = User::factory()->landlords()->create();
        $randomLandlord = Landlord::factory()->create();
        $canUpdateAsNormal = $policy->update($landlordUser, $randomLandlord);
        $this->assertFalse($canUpdateAsNormal);

        $normalTenantUser = User::factory()->tenants()->create(); //* Tenant user can't
        $canNotUpdateAsTenantUser = $policy->update($normalTenantUser, $randomLandlord);
        $this->assertFalse($canNotUpdateAsTenantUser);

        $landlordUser->landlord()->save($randomLandlord); //* Associate landlord user with landlord model
        $canViewSelfAsLandlordUser = $policy->update($landlordUser, $randomLandlord);
        $this->assertTrue($canViewSelfAsLandlordUser);

        $adminUser = User::factory()->admins()->create();
        $canUpdateAsAdmin = $policy->update($adminUser, $randomLandlord);
        $this->assertTrue($canUpdateAsAdmin);
    }

    public function testDelete()
    {
        //* Pattern: Admins can delete anyone. Consider if landlord can delete self or just by deleting account
        $policy = new LandlordPolicy();

        $landlordUser = User::factory()->landlords()->create();
        $randomLandlord = Landlord::factory()->create();
        $canNotDeleteAsLandlordUser = $policy->delete($landlordUser, $randomLandlord);
        $this->assertFalse($canNotDeleteAsLandlordUser);

        $tenantUser = User::factory()->tenants()->create();
        $canNotDeleteAsTenantUser = $policy->delete($tenantUser, $randomLandlord);
        $this->assertFalse($canNotDeleteAsTenantUser);

        // $landlordUser->landlord()->save($randomLandlord);
        // $canDeleteSelfAsLandlord = $policy->delete($landlordUser, $randomLandlord);
        // $this->assertTrue($canDeleteSelfAsLandlord);

        $adminUser = User::factory()->admins()->create();
        $canDeleteAsAdmin = $policy->delete($adminUser, $randomLandlord);
        $this->assertTrue($canDeleteAsAdmin);
    }
}
