<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Property;
use Faker\Generator as Faker;

$factory->define(Property::class, function (Faker $faker) {
    return [
        'street' => $faker->buildingNumber . ' ' . $faker->streetName,
        'city' => $faker->city,
        'state' => $faker->state,
        'postal_code' => substr($faker->postcode, 0, 5),
    ];
});

$factory->state(Property::class, 'rooms', function ($faker) {
    return ['additional_info' => $faker->secondaryAddress];
});
