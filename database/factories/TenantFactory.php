<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Tenant;
use Faker\Generator as Faker;

$factory->define(Tenant::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName(),
        'surname' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'claimed' => false,
        'current' => true
    ];
});

//* Claimed account, not necessarily seeking, currently renting or previous renter
$factory->state(Tenant::class, 'claimed', ['claimed' => true]);

//* Seeking Tenancy - Property, tenant & landlord null so they can be set later
$factory->state(Tenant::class, 'seeking', [
    'claimed' => true, //* Claimed because this user wants to find a property/landlord
    'current' => false, //* Not currently renting
    'property_id' => null,
    'landlord_id' => null,
    'lease_id' => null
]);

//* Currently Renting - Property, tenant & landlord filled
$factory->state(Tenant::class, 'renting', function () {
    //? When using factory method in a state def, use a closure!
    return [
        //* Not necessarily claimed account
        'current' => true,
        'property_id' => factory(App\Property::class), //* Careful property will have a null landlord_id
        'landlord_id' => factory(App\Landlord::class),
        'lease_id' => factory(App\Lease::class)
    ];
});

//* Previous tenant 
$factory->state(Tenant::class, 'previous', function () {
    return [
        //* Not necessarily claimed account
        'current' => false,
        //* The following changes when this tenant seeks out new residence/landlord
        'property_id' => factory(App\Property::class),
        'landlord_id' => factory(App\Landlord::class),
        'lease_id' => factory(App\Lease::class) //* Lease not updated so it shows last dates
    ];
});
