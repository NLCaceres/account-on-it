<?php

namespace Database\Factories;

use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory {

    protected $model = Property::class;

    public function definition() {
        return [
            'street' => $this->faker->buildingNumber() . ' ' . $this->faker->streetName(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'postal_code' => substr($this->faker->postcode(), 0, 5),
        ];
    }

    //* State Manipulation Method
    public function rooms() {
        return $this->state(function (array $attributes) { 
            return ['additional_info' => $this->faker->secondaryAddress()];
        });
    }
}
