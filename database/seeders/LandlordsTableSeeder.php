<?php

namespace Database\Seeder;

use App\Models\Landlord;
use App\Models\Lease;
use App\Models\Property;
use App\Models\Tenant;
use Illuminate\Database\Seeder;

class LandlordsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //todo Update to laravel 8 magic methods
        $landlords = Landlord::factory()->count(20)->create();
        foreach ($landlords as $landlord) {
            $properties = Property::factory()->count(5)->make();
            $landlord->properties()->saveMany($properties);

            $leases = Lease::factory()->count(5)->make();
            $tenants = Tenant::factory()->count(10)->make();

            for ($x = 0; $x < 5; $x++) {
                //* Take property & lease from set of properties and leases
                $property = $properties[$x];
                $lease = $leases[$x];
                //* Grab 2 tenants to put in property and lease
                $tenantSet = [$tenants[$x * 2], $tenants[$x * 2 + 1]];
                $lease->property_id = $property->id; //* Don't forget to relate property to lease
                //* Save it all!
                $lease->save();
                $property->tenants()->saveMany($tenantSet);
                $lease->tenants()->saveMany($tenantSet);
            }
            $landlord->tenants()->saveMany($tenants); //* Give landlord their tenants
        }
    }
}
