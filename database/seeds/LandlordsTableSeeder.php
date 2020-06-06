<?php

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
        factory(App\Landlord::class, 20)->create()->each(function ($landlord) {
            $properties = factory(App\Property::class, 5)->make();
            $landlord->properties()->saveMany($properties);

            $leases = factory(App\Lease::class, 5)->make();
            $tenants = factory(App\Tenant::class, 10)->make();

            for ($x = 0; $x < 5; $x++) {
                $property = $properties[$x];
                $lease = $leases[$x];
                $tenantSet = [$tenants[$x * 2], $tenants[$x * 2 + 1]];
                $lease->property_id = $property->id;
                $lease->save();
                $property->tenants()->saveMany($tenantSet);
                $lease->tenants()->saveMany($tenantSet);
            }
            $landlord->tenants()->saveMany($tenants);
        });
    }
}
