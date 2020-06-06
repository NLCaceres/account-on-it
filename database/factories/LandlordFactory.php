<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Landlord;
use Faker\Generator as Faker;

$factory->define(Landlord::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName(),
        'surname' => $faker->lastName,
        'email' => $faker->unique()->safeEmail
    ];
});
