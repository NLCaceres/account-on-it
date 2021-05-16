<?php

namespace Database\Factories;

use App\Models\Landlord;
use App\Models\Lease;
use App\Models\Property;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class TenantFactory extends Factory {

    protected $model = Tenant::class;

    public function definition() {
        return [
            'first_name' => $this->faker->firstName(),
            'surname' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
        ];
    }

    //* State Manipulation Method
    //* Seeking Tenancy - Property, tenant & landlord null so they can be set later
    public function seeking() {
        return $this->state(function (array $attributes) { 
            return [
                'property_id' => null,
                'landlord_id' => null,
                'lease_id' => null
            ];
        });
    }
    //* Currently Renting - Property, tenant & landlord filled
    public function renting() {
        return $this->state(function (array $attributes) { 
            //? When using factory method in a state def, use a closure!
            return [
                //* Not necessarily registered tenant user
                'property_id' => Property::factory(), //* Careful: Property will have a null landlord_id
                'landlord_id' => Landlord::factory(),
                'lease_id' => Lease::factory()
            ];
        });
    }
    //* Previous tenant 
    public function previous() {
        return $this->state(function (array $attributes) { 
            return [
                //* Not necessarily registered tenant user
                //* The following changes when this tenant seeks out new residence/landlord
                'property_id' => Property::factory(),
                'landlord_id' => Landlord::factory(),
                'lease_id' => Lease::factory() //* Lease not updated so it shows last dates
            ];
        });
    }
}

