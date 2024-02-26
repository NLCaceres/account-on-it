<?php

namespace Tests\Feature\Policies;

use App\Models\Landlord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Helpers\PoliciesTestInterface;
use App\Models\User;
use App\Models\Tenant;
use App\Policies\TenantPolicy;
use Tests\TestCase;

class TenantPolicyTest extends TestCase implements PoliciesTestInterface
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testViewAny()
    {
        //* Current Pattern: Normal Users can not view the whole list of users. ONLY Admins and Landlords can.
        $policy = new TenantPolicy();

        $canViewAsLandlordUser = $policy->viewAny(User::factory()->landlords()->create());
        $this->assertTrue($canViewAsLandlordUser);

        $canNotViewAsTenantUser = $policy->viewAny(User::factory()->tenants()->create());
        $this->assertFalse($canNotViewAsTenantUser);

        $canViewAnyAsAdmin = $policy->viewAny(User::factory()->admins()->create());
        $this->assertTrue($canViewAnyAsAdmin);
    }

    public function testView() 
    {
        //* Pattern: Tenant Users can view themselves. Their landlords can too. Admins can view anyone
        $policy = new TenantPolicy();

        $tenantUser = User::factory()->tenants()->create();
        $randomTenant = Tenant::factory()->create();
        $canNotViewAsNormal = $policy->view($tenantUser, $randomTenant);
        $this->assertFalse($canNotViewAsNormal);

        $tenantUser->tenant()->save($randomTenant);
        $canViewSelfAsTenantUser = $policy->view($tenantUser, $randomTenant);
        $this->assertTrue($canViewSelfAsTenantUser); 

        $landlordUser = User::factory()->landlords()->create();
        $canNotViewOthersTenants = $policy->view($landlordUser, $randomTenant);
        $this->assertFalse($canNotViewOthersTenants);

        $landlordUser->landlord()->save(Landlord::factory()->create()); $landlordUser->refresh();
        $landlordUser->landlord->tenants()->save($randomTenant);
        $canViewOwnTenants = $policy->view($landlordUser, $randomTenant);
        $this->assertTrue($canViewOwnTenants);

        $adminUser = User::factory()->admins()->create();
        $canViewAsAdmin = $policy->view($adminUser, $randomTenant);
        $this->assertTrue($canViewAsAdmin);
    }

    public function testCreate() 
    {
        //* Pattern: Landlord users can create their tenants profiles. Admins can too. Tenants can't make more tenants.
        $policy = new TenantPolicy();
        $normalLandlordUser = User::factory()->landlords()->create();
        $canCreateAsLandlordUser = $policy->create($normalLandlordUser);
        $this->assertTrue($canCreateAsLandlordUser);

        $normalTenantUser = User::factory()->tenants()->create();
        $canNotCreateAsTenantUser = $policy->create($normalTenantUser);
        $this->assertFalse($canNotCreateAsTenantUser);

        $canCreateAsAdmin = $policy->create(User::factory()->admins()->create());
        $this->assertTrue($canCreateAsAdmin);
    }

    public function testUpdate() 
    {
        //* Pattern: Tenant Users can only update themselves! Unregistered accounts can be updated by landlords. Admins can update anyone
        $policy = new TenantPolicy();

        $tenantUser = User::factory()->tenants()->create();
        $randomTenant = Tenant::factory()->create();
        $canNotUpdateRandomTenant = $policy->update($tenantUser, $randomTenant);
        $this->assertFalse($canNotUpdateRandomTenant);

        $tenantUser->tenant()->save($randomTenant);
        $canUpdateSelfAsTenantUser = $policy->view($tenantUser, $randomTenant);
        $this->assertTrue($canUpdateSelfAsTenantUser);

        $landlordUser = User::factory()->landlords()->create();
        $landlordUser->landlord()->save(Landlord::factory()->create()); $landlordUser->refresh();
        $unregisteredTenant = Tenant::factory()->create();
        $landlordUser->landlord->tenants()->save($unregisteredTenant);
        $canUpdateUnregisteredTenants = $policy->update($landlordUser, $unregisteredTenant);
        $this->assertTrue($canUpdateUnregisteredTenants);

        $adminUser = User::factory()->admins()->create();
        $canUpdateRegisteredTenantsAsAdmin = $policy->update($adminUser, $randomTenant);
        $canUpdateUnregisteredTenantsAsAdmin = $policy->update($adminUser, $unregisteredTenant);
        $this->assertTrue($canUpdateRegisteredTenantsAsAdmin && $canUpdateUnregisteredTenantsAsAdmin);
    }

    public function testDelete()
    {
        //* Pattern: Admins can delete anyone. Landlords can delete unregistered tenants. Consider if tenants can delete themselves
        $policy = new TenantPolicy();

        $landlordUser = User::factory()->landlords()->create();
        $randomTenant = Tenant::factory()->create();
        $canNotDeleteRandomTenantAsLandlordUser = $policy->delete($landlordUser, $randomTenant);
        $this->assertFalse($canNotDeleteRandomTenantAsLandlordUser);

        $tenantUser = User::factory()->tenants()->create();
        $canNotDeleteAsTenantUser = $policy->delete($tenantUser, $randomTenant);
        $this->assertFalse($canNotDeleteAsTenantUser);

        $landlordUser->landlord()->save(Landlord::factory()->create()); $landlordUser->refresh();
        $unregisteredTenant = Tenant::factory()->create();
        $landlordUser->landlord->tenants()->save($unregisteredTenant);
        $canDeleteUnregisteredTenants = $policy->delete($landlordUser, $unregisteredTenant);
        $this->assertTrue($canDeleteUnregisteredTenants);

        $adminUser = User::factory()->admins()->create();
        $canDeleteAsAdmin = $policy->delete($adminUser, $randomTenant);
        $this->assertTrue($canDeleteAsAdmin);
    }
}
