<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //? factory here is a global func that takes any class with a factory setup
        //? Could also use EloquentModel::create or DB::insert but factory is super useful
        factory(App\User::class, 10)->states('admins')->create();

        //* Create landlords and bulk of tenants w/ properties
        factory(App\User::class, 15)->create()->each(\Closure::fromCallable([$this, 'landlordUser']));

        //* Users that can be tested and logged into easily
        $this->loginUsers();
    }

    protected function loginUsers()
    {
        $landlord = $this->loginLandlord(); //* Retrieved landlord for quicker seeding (no DB call later)

        //* Tenant that's already renting from a landlord on the site
        $this->rentingTenantUser($landlord);

        //* Tenant looking for a place
        $this->seekingTenantUser();

        //* Admin
        factory(App\User::class)->create([
            'first_name' => 'Crash',
            'surname' => 'Bandicoot',
            'email' => 'cbandicoot9617@email.com',
            'password' => Hash::make(env('TEST_ADMIN')),
            'role' => 1, //* Admin Role
        ]);
    }

    protected function landlordUser($user)
    {
        //* Create related landlord user
        $landlord = factory(App\Landlord::class)->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email
        ]);

        //* Create tenants for the landlord user
        $tenants = factory(App\Tenant::class, 5)->states('claimed')->create()->each(function ($tenant) {
            $tenantUser = factory(App\User::class)->states('tenants')->create([
                'first_name' => $tenant->first_name,
                'surname' => $tenant->surname,
                'email' => $tenant->email
            ]);
            $tenantUser->tenant()->save($tenant);
        }); //* Tenants with accounts!
        $tenants = $tenants->concat(factory(App\Tenant::class, 5)->create()); //* Tenants w/out accounts

        //* Make properties for landlord (to use in a sec, that's why no immediate save)
        $properties = factory(App\Property::class, 3)->make();
        //? Laravel Collections have a ton of useful methods, most match php's array methods, some are bonus like concar!
        //? Arrays in PHP have array_merge, array_replace & simple addition (like Collection's union)
        //? The great thing here is you can append as many values (multiple concats in a row) as you like
        $properties = $properties->concat(factory(App\Property::class, 2)->states('rooms')->make());
        $landlord->properties()->saveMany($properties);

        $leases = factory(App\Lease::class, 4)->make(); //* Make leases for each property
        $leases->push(factory(App\Lease::class)->states('past')->make());

        //* Each property, lease & pair of tenants assigned as needed
        for ($x = 0; $x < 5; $x++) {
            $property = $properties[$x]; //* Grab one of the five properties

            $lease = $leases[$x]; //* Grab one of the five leases

            $tenantSet = [$tenants[$x * 2], $tenants[$x * 2 + 1]]; //* Grabs pairs of tenants (0,1; 2,3; etc)

            $lease->property_id = $property->id; //* Relate lease & property
            $lease->save();

            $property->tenants()->saveMany($tenantSet); //* Relate property w/ tenants
            $lease->tenants()->saveMany($tenantSet); //* Relate lease w/ tenants
        }

        $landlord->tenants()->saveMany($tenants); //* Relate landlord & tenants
        $user->landlord()->save($landlord); //* Relate Landlord to specific User

        return $landlord;
    }

    protected function loginLandlord()
    {
        $user = factory(App\User::class)->states('landlords')->create([
            'first_name' => 'John',
            'surname' => 'Doe',
            'email' => 'JonDoe@email.com',
            'password' => Hash::make(env('TEST_LANDLORD'))
        ]); //* Creates a landlord to manage tenants

        return $this->landlordUser($user); //* Move landlord up to be used by rentingTenantUser
    }

    protected function rentingTenantUser($landlord = null)
    {
        $user = factory(App\User::class)->states('tenants')->create([
            'first_name' => 'Jane',
            'surname' => 'Doe',
            'email' => 'JaneDoe@email.com',
            'password' => Hash::make(env('TEST_RENTING_TENANT'))
        ]);

        //* Make related currently renting tenant user ('make' does NOT save)
        $tenant = factory(App\Tenant::class)->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email,
            'claimed' => true,
        ]); //* Not using 'renting' state since it will create it's own property, lease, & landlord

        //* Grab all landlords, pick one at random or select one deliberately (such as one placed in param)
        // $allLandlords = App\Landlord::all();
        // $landlord_id = rand(1, $allLandlords->count());
        $tenant->landlord_id = $landlord->id;

        $landlord->loadMissing('properties'); //* Relations not always included! so may need to be loaded (can change this in Model)

        //* Select a property of theirs
        $property_id = rand(1, $landlord->properties->count());
        $property = $landlord->properties[$property_id];
        $tenant->property_id = $property_id;

        //* Grab the property lease
        $tenant->lease_id = $property->lease->id;

        $tenant->save(); //* Save it all 
        $user->tenant()->save($tenant); //* & relate it to a user 
    }
    protected function seekingTenantUser()
    {
        $user = factory(App\User::class)->states('tenants')->create([
            'first_name' => 'John',
            'surname' => 'Smith',
            'email' => 'JonSmith@email.com',
            'password' => Hash::make(env('TEST_SEEKING_TENANT'))
        ]);

        //* Make related seeking tenant user
        $tenant = factory(App\Tenant::class)->states('seeking')->create([
            'first_name' => $user->first_name,
            'surname' => $user->surname,
            'email' => $user->email,
        ]);
        //* The above state takes care of the rest of the attributes

        $user->tenant()->save($tenant);
        //* All relations set to null & it's a claimed and not currently renting account
    }
}
