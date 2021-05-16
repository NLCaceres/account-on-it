<?php

namespace Tests\Feature\Policies;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Helpers\PoliciesTestInterface;
use Tests\TestCase;

class UserPolicyTest extends TestCase implements PoliciesTestInterface
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testViewAny()
    {
        //* Pattern: Normal Users can not view the whole list of users. ONLY Admins can.
        $policy = new UserPolicy();

        $canViewAnyAsNormal = $policy->viewAny(User::factory()->landlords()->create());
        $this->assertFalse($canViewAnyAsNormal);

        $canViewAnyAsAdmin = $policy->viewAny(User::factory()->admins()->create());
        $this->assertTrue($canViewAnyAsAdmin);
    }

    public function testView() 
    {
        //* Pattern: Normal Users can only view themselves! No one else. Admins can view anyone
        $policy = new UserPolicy();
        $normalUser = User::factory()->landlords()->create();
        $randomUser = User::factory()->landlords()->create();
        $canNotViewAsNormal = $policy->view($normalUser, $randomUser);
        $this->assertFalse($canNotViewAsNormal);

        $canViewAsNormal = $policy->view($normalUser, $normalUser);
        $this->assertTrue($canViewAsNormal);

        $adminUser = User::factory()->admins()->create();
        $canViewAsAdmin = $policy->view($adminUser, $randomUser);
        $this->assertTrue($canViewAsAdmin);
    }

    public function testCreate() 
    {
        //* Pattern: Normal Users can't make users! Only register themselves. Only Admins can use this route! 
        $policy = new UserPolicy();
        $normalUser = User::factory()->landlords()->create();
        $canCreateAsNormal = $policy->create($normalUser);
        $this->assertFalse($canCreateAsNormal);

        $canCreateAsAdmin = $policy->create(User::factory()->admins()->create());
        $this->assertTrue($canCreateAsAdmin);
    }

    public function testUpdate() 
    {
        //* Pattern: Normal Users can only update themselves! No one else. Admins can update anyone
        $policy = new UserPolicy();

        $normalUser = User::factory()->landlords()->create();
        $randomUser = User::factory()->landlords()->create();
        $canUpdateAsNormal = $policy->update($normalUser, $randomUser);
        $this->assertFalse($canUpdateAsNormal);

        $canViewAsNormal = $policy->update($normalUser, $normalUser);
        $this->assertTrue($canViewAsNormal);

        $adminUser = User::factory()->admins()->create();
        $canUpdateAsAdmin = $policy->update($adminUser, $randomUser);
        $this->assertTrue($canUpdateAsAdmin);
    }

    public function testDelete()
    {
        //* Pattern: Normal Users can only delete themselves! No one else. Admins can delete anyone
        $policy = new UserPolicy();

        $normalUser = User::factory()->landlords()->create();
        $randomUser = User::factory()->landlords()->create();
        $canNotDeleteAsNormal = $policy->delete($normalUser, $randomUser);
        $this->assertFalse($canNotDeleteAsNormal);

        $canDeleteAsNormal = $policy->delete($normalUser, $normalUser);
        $this->assertTrue($canDeleteAsNormal);

        $adminUser = User::factory()->admins()->create();
        $canDeleteAsAdmin = $policy->delete($adminUser, $randomUser);
        $this->assertTrue($canDeleteAsAdmin);
    }
}
