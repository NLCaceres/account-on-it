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
    use RefreshDatabase;
    use ApiControllerTestTrait;
    protected function baseURL() { return $this->URL_PREFIX . 'landlords'; } //* /api/landlords

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        Landlord::factory()->count(10)->create();
        $adminResponse = $this->makeRequest(User::factory()->admins()->create());
        $adminResponse->assertOk();
        $adminResponse->assertJsonCount(10, 'data'); //* Grabs the 'data' key from the JSON and expects to find an array of 10 items

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
        $adminResponse->assertOk()->assertJsonIsObject()->assertJson(['landlord' => ['properties' => [], 'tenants' => []]]);

        $landlordNotViewingSelfResponse = $this->makeRequest(User::factory()->landlords()->create(), $landlordModelID);
        $landlordNotViewingSelfResponse->assertForbidden();

        //? 'Through' Relationships can't save at all, so have to go through the simple relationships like 'tenants()' or 'properties()'
        $landlordUser->landlord->tenants()->saveMany(Tenant::factory()->count(3)->create());
        $landlordUser->landlord->properties()->saveMany(Property::factory()->count(3)->create(['landlord_id'=>$landlordModelID]));
        $landlordViewingSelfResponse = $this->makeRequest($landlordUser, $landlordModelID);
        $landlordViewingSelfResponse->assertOk()->assertJsonIsObject()->assertJsonCount(3, 'landlord.properties')->assertJsonCount(3, 'landlord.tenants');

        $tenantUser = User::factory()->tenants()->create();
        $tenantResponse = $this->makeRequest($tenantUser, $landlordModelID);
        $tenantResponse->assertForbidden();

        $tenantWithLandlordUser = User::factory()->tenants()->hasTenant()->create();
        $landlordUser->landlord->tenants()->save($tenantWithLandlordUser->tenant);
        $tenantViewingOwnLandlordResponse = $this->makeRequest($tenantWithLandlordUser, $landlordModelID);
        //* WHEN a tenant has a null "property_id", THEN they are expected to be not renting from this Landlord, so DON'T send any tenant or property info
        $this->assertNull($tenantWithLandlordUser->tenant->property_id);
        $tenantViewingOwnLandlordResponse->assertOk()->assertJsonIsObject()->assertJsonCount(0, 'landlord.properties')->assertJsonCount(0, 'landlord.tenants');

        $tenantWithLandlordUser->tenant->property_id = $landlordUser->landlord->properties[0]->id;
        $tenantWithLandlordUser->push(); //? Recursively saves all associated relationships to ensure changes propagate throughout
        //* WHEN a tenantUser living alone in their property requests their Landlord info 
        $tenantWithPropertyResponse = $this->makeRequest($tenantWithLandlordUser, $landlordModelID);
        //* THEN they only receive their property (always 1) and any other Tenants living in their property, in this case, just their own info
        $tenantWithPropertyResponse->assertOk()->assertJsonIsObject()->assertJsonCount(1, 'landlord.properties')->assertJsonCount(1, 'landlord.tenants');
    }

    public function testStore()
    {
        $adminUser = User::factory()->admins()->create(); /** @var \App\Models\User $adminUser */ //? PHPDocs also work inline!
        $landlordAttributes = Landlord::factory()->raw(); //* WHEN no 'user_id' provided, THEN unable to complete request
        $this->makeRequest($adminUser, '', 1, $landlordAttributes)->assertJsonValidationErrors(['user_id'])->assertUnprocessable();

        $landlordAttributes['user_id'] = 123; //* WHEN the 'user_id' doesn't match any known user, THEN unable to complete request
        $this->makeRequest($adminUser, requestType: 1, data: $landlordAttributes)->assertUnprocessable();

        $landlordAttributes['user_id'] = $adminUser->id; //* WHEN 'user_id' to link to the Landlord matches a user in the table (even if linked User is an admin)
        $this->makeRequest($adminUser, '', 1, $landlordAttributes)->assertCreated(); //* THEN create new Landlord account

        $landlordResponse = $this->makeRequest(User::factory()->landlords()->create(), '', 1, Landlord::factory()->raw(['user_id'=>2]));
        $landlordResponse->assertForbidden();

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), '', 1, Landlord::factory()->raw(['user_id'=>2]));
        $tenantResponse->assertForbidden();
    }

    public function testUpdate()
    {
        $landlordData = ['surname' => 'last_name', 'email'=>'exampleEmail123@foobar.com'];
        $landlordUser = User::factory()->landlords()->hasLandlord($landlordData)->create($landlordData);
        $landlordModelID = $landlordUser->landlord->id;
        //* WHEN an admin updates a Landlord
        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $landlordModelID, 2, array_merge(['first_name' => 'new_name'], $landlordData));
        $adminResponse->assertNoContent(); //* THEN the request works

        //* WHEN a Landlord tries to update a DIFFERENT Landlord
        $landlordNotUpdatingSelfResponse = $this->makeRequest(User::factory()->landlords()->create(), $landlordModelID, 2, array_merge(['first_name' => 'second_name'], $landlordData));
        $landlordNotUpdatingSelfResponse->assertForbidden(); //* THEN the request fails

        $landlordUpdatingSelfResponse = $this->makeRequest($landlordUser, $landlordModelID, 2, array_merge(['first_name' => 'third_name'], $landlordData));
        $landlordUpdatingSelfResponse->assertNoContent(); //* A Landlord updating itself works fine!

        //* WHEN a tenant tries to update Landlord information
        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), $landlordModelID, 2, array_merge(['first_name' => 'fourth_name'], $landlordData));
        $tenantResponse->assertForbidden(); //* THEN the request will be forbidden
    }
    public function testDestroy()
    {
        $landlords = Landlord::factory()->count(10)->create();
        $landlordResponse = $this->makeRequest(User::factory()->landlords()->create(), $landlords[0]->id, 3);
        $landlordResponse->assertForbidden();

        $tenantResponse = $this->makeRequest(User::factory()->tenants()->create(), $landlords[0]->id, 3);
        $tenantResponse->assertForbidden();

        //* ONLY WHEN an admin makes a destroy request, THEN the request will be permitted
        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $landlords[0]->id, 3);
        $adminResponse->assertNoContent();
    }
}
