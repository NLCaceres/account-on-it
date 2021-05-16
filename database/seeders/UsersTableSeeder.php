<?php

namespace Database\Seeder;

use App\Models\User;
use App\Models\Landlord;
use App\Models\Tenant;
use App\Models\Property;
use App\Models\Lease;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    //todo Refactor based on Laravel 8 or future versions magic methods
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //? 7.0 used global factory fn that takes the class as a param
        //? 8.0 went back to ClassName::factory version seen below
        //? There's also EloquentModel::create or DB::insert but factories help w/ testing
        User::factory()->count(10)->admins()->create();

        $users = User::factory()->count(15); //* Create landlords here

        foreach ($users as $user) { $this->landlordUser($user); } //* Add their tenants with properties & leases 

        $this->loginUsers(); //* Users that can be tested and logged into easily
    }

    protected function loginUsers()
    {
        $landlord = $this->loginLandlord(); //* Retrieved landlord for quicker seeding (no DB call later)

        $this->rentingTenantUser($landlord); //* Tenant that's already renting from a landlord on the site

        $this->seekingTenantUser(); //* Basic User with Tenant model looking for a place so no relations needed

        User::factory()->create([ //* Admin User that can be logged in
            'first_name' => 'Crash',
            'surname' => 'Bandicoot',
            'email' => 'cbandicoot9617@email.com',
            'password' => Hash::make(env('TEST_ADMIN')),
            'role' => 1, //* Admin Role
        ]);
    }

    protected function loginLandlord()
    {
        $user = User::factory()->landlords()->create([ //* Landlord user that can be logged in
            'first_name' => 'John',
            'surname' => 'Doe',
            'email' => 'JonDoe@email.com',
            'password' => Hash::make(env('TEST_LANDLORD'))
        ]); //* Creates a landlord to manage tenants

        return $this->landlordUser($user); //* Move landlord up to be used by rentingTenantUser
    }

    protected function landlordUser($user)
    { //* All relations set - tenants, properties, leases
        //* Create related landlord user
        $landlord = Landlord::factory()->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email
        ]);

        //* Create tenants with registered user accounts to relate to landlord user
        $tenants = Tenant::factory()->count(5)->make();
        foreach($tenants as $tenant) { 
            //* Tenant User accounts to save with above tenant list
            $tenantUser = User::factory()->tenants()->create([
                'first_name' => $tenant->first_name,
                'surname' => $tenant->surname,
                'email' => $tenant->email
            ]); 
            $tenantUser->tenant()->save($tenant);
            $tenant->save();
        }
        $tenants = $tenants->concat(Tenant::factory()->count(5)->create()); //* Add in tenants w/out accounts to list

        //* Make properties for landlord (to use in a sec, that's why no immediate save)
        $properties = Property::factory()->count(3)->make();

        //? Laravel Collections have a ton of useful methods, most match php's array methods, some are bonus like concat!
        //? Arrays in PHP have array_merge, array_replace & simple addition (like Collection's union)
        //? The great thing here is you can append as many values (multiple concats in a row) as you like
        $properties = $properties->concat(Property::factory()->count(2)->rooms()->make());
        $landlord->properties()->saveMany($properties);

        $leases = Lease::factory()->count(4)->make(); //* Make leases for each property
        $leases->push(Lease::factory()->past()->make());

        //* Each property, lease & pair of tenants assigned as needed
        for ($x = 0; $x < 5; $x++) {
            $property = $properties[$x]; //* Grab one of the five properties

            $lease = $leases[$x]; //* Grab one of the five leases

            $tenantSet = [$tenants[$x * 2], $tenants[$x * 2 + 1]]; //* Grabs pairs of tenants (0,1; 2,3; etc)

            //* Relate lease & property then finalize it by saving
            $lease->property_id = $property->id; 
            $lease->save();

            $property->tenants()->saveMany($tenantSet); //* Relate property w/ tenants
            $lease->tenants()->saveMany($tenantSet); //* Relate lease w/ tenants
        }

        //? Relationship methods can normally just be props (so no '()') - not here though since calling save
        $landlord->tenants()->saveMany($tenants); //* Relate landlord & tenants
        $user->landlord()->save($landlord); //* Relate Landlord to specific User

        return $landlord;
    }

    protected function rentingTenantUser($landlord = null)
    { //* All relations set - property, lease, landlord, registered
        $user = User::factory()->tenants()->create([ //* Renting Tenant user that can be logged in
            'first_name' => 'Jane',
            'surname' => 'Doe',
            'email' => 'JaneDoe@email.com',
            'password' => Hash::make(env('TEST_RENTING_TENANT'))
        ]);

        //* Make related currently renting tenant user ('make' does NOT save)
        $tenant = Tenant::factory()->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email,
            
        ]); //* Not using 'renting' state since it will create it's own property, lease, & landlord

        //* Originally considered grabbing random landlord but instead 1 is passed in
        $tenant->landlord_id = $landlord->id;

        $landlord->loadMissing('properties'); //* Relations not always included! so may need to be loaded (can change this in Model)

        //* Select a property from random landlord & relate landlord to property & tenant to property
        $property_id = rand(1, $landlord->properties->count());
        $property = $landlord->properties[$property_id];
        $tenant->property_id = $property_id;

        $tenant->lease_id = $property->lease->id; //* Relate property to lease

        $tenant->save(); //* Save it all 
        $user->tenant()->save($tenant); //* & relate it to a user 
    }
    protected function seekingTenantUser() //* Not currently renting tenant
    { //* All relations set to null except user_id so it's a registered account
        $user = User::factory()->tenants()->create([ //* Seeking Tenant that can be logged in
            'first_name' => 'John',
            'surname' => 'Smith',
            'email' => 'JonSmith@email.com',
            'password' => Hash::make(env('TEST_SEEKING_TENANT'))
        ]);

        //* Make related seeking tenant user
        $tenant = Tenant::factory()->seeking()->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email,
        ]); //* The seeking state takes care of the rest of the attributes

        $user->tenant()->save($tenant); 
    }
}
