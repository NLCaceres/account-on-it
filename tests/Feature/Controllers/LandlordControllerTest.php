<?php

namespace Tests\Feature\Controllers;

use App\Models\Landlord;
use App\Models\Property;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helpers\ApiControllerTestTrait;
use Tests\TestCase;

class LandlordControllerTest extends TestCase 
{
    use ApiControllerTestTrait;
    protected function baseURL() { return $this->URL_PREFIX . 'landlords'; } //* /api/landlords

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $landlords = Landlord::factory()->count(10)->create();
        $adminResponse = $this->makeRequest(User::factory()->admins()->create());
        $adminResponse->assertOk();
        //? getData() method only for JsonResponses or when explicit response() return uses json()
        $dataForAdmin = $adminResponse->baseResponse->getData()->data; //* Extract just the data array! 
        $this->assertEquals(count($landlords), count($dataForAdmin)); //* & finally check count

        $landlordResponse = $this->makeRequest(User::factory()->landlords()->create());
        $landlordResponse->assertForbidden(); //* No need to check data. Get a 403 anyways
        
        //todo Tenant Searching for landlord
    }

    public function testShow()
    {
        //? Laravel magic methods also work for 1 to 1 relationships (only hasMany, belongsTo, many to many mentioned for some reason)
        //? Similar convention, landlord() magic method is hasLandlord while a hasMany example would be tenants() is hasTenants(count, overrideAttrArr)
        $landlordUser = User::factory()->landlords()->hasLandlord()->create(); //? Placement just has to be before make(), raw(), or create()
        $landlordModelID = $landlordUser->landlord->id;

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $landlordModelID);
        $adminResponse->assertOk();
        //? Returns an array whereas getData() from jsonResponse() returns stdClass (anon class in php similar to JS Object)
        $dataForAdmin = $adminResponse->baseResponse->getOriginalContent(); 
        $this->assertArrayHasKey('landlord', $dataForAdmin); $this->assertCount(3, $dataForAdmin);

        $landlordNotViewingSelfResponse = $this->makeRequest(User::factory()->landlords()->create(), $landlordModelID);
        $landlordNotViewingSelfResponse->assertForbidden();

        //? Through Relationships won't allow save or saveMany so have to go through the simple relationships like below
        $landlordUser->landlord->tenants()->saveMany(Tenant::factory()->count(3)->create());
        $landlordUser->landlord->properties()->saveMany(Property::factory()->count(3)->create(['landlord_id'=>$landlordModelID]));
        $landlordViewingSelfResponse = $this->makeRequest($landlordUser, $landlordModelID);
        $landlordViewingSelfResponse->assertOk();
        $dataForLandlordViewingSelf = $landlordViewingSelfResponse->baseResponse->getOriginalContent();
        $this->assertArrayHasKey('landlord', $dataForLandlordViewingSelf); $this->assertCount(3, $dataForLandlordViewingSelf); 
        $this->assertCount(3, $dataForLandlordViewingSelf['tenants']); $this->assertCount(3, $dataForLandlordViewingSelf['properties']);

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), $landlordModelID);
        $tenantResponse->assertForbidden();
    }

    public function testStore()
    {
        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), '', 1, Landlord::factory()->raw(['user_id' => 2]));
        $adminResponse->assertCreated();

        $landlordResponse = $this->makeRequest(User::factory()->landlords()->create(), '', 1, Landlord::factory()->raw(['user_id'=>2]));
        $landlordResponse->assertForbidden();

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), '', 1, Landlord::factory()->raw(['user_id'=>2]));
        $tenantResponse->assertForbidden();
    }

    public function testUpdate()
    {
        $landlordData = ['surname' => 'last_name', 'email'=>'exampleEmail123@foobar.com'];
        $landlordUser = User::factory()->landlords()->hasLandlord($landlordData)->create($landlordData); //? Placement just has to be before make(), raw(), or create()
        $landlordModelID = $landlordUser->landlord->id;

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $landlordModelID, 2, array_merge(['first_name' => 'new_name'], $landlordData));
        $adminResponse->assertNoContent();

        $landlordNotUpdatingSelfResponse = $this->makeRequest(User::factory()->landlords()->create(), $landlordModelID, 2, array_merge(['first_name' => 'second_name'], $landlordData));
        $landlordNotUpdatingSelfResponse->assertForbidden();

        $landlordUpdatingSelfResponse = $this->makeRequest($landlordUser, $landlordModelID, 2, array_merge(['first_name' => 'third_name'], $landlordData));
        $landlordUpdatingSelfResponse->assertNoContent();

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), $landlordModelID, 2, array_merge(['first_name' => 'fourth_name'], $landlordData));
        $tenantResponse->assertForbidden();
    }
    public function testDestroy()
    {
        $randomLandlordId = 4;
        $landlordResponse = $this->makeRequest(User::factory()->landlords()->create(), $randomLandlordId, 3);
        $landlordResponse->assertForbidden();

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), $randomLandlordId, 3);
        $tenantResponse->assertForbidden();

        //* Since admin CAN delete, best to make that request last (or face a 404 not found)
        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $randomLandlordId, 3);
        $adminResponse->assertNoContent();
    }
}
