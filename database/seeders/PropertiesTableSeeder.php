<?php

namespace Database\Seeder;

use App\Models\Property;
use Illuminate\Database\Seeder;

class PropertiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Property::factory()->count(10)->create();
        Property::factory()->count(10)->rooms()->create();
    }
}
