<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'first_name' => $faker->firstName(),
        'surname' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // Hashed password stored
        'remember_token' => Str::random(10),
    ];
});

//? To set up data with specific attribute vals 'state()' works! and accepts a closure too
$factory->state(User::class, 'admins', ['role' => 1]);
//? Could also set up data after making (or even after creating [init'ing then saving])
//? BUT 'afterMaking()' & 'afterCreating()' usually are for relating models to each other
//? Can also specify afterMaking/Creating funcs for specific state factories w/ 'afterMakingState/afterCreatingState'

$factory->state(User::class, 'landlords', ['account_type' => 0]);
$factory->state(User::class, 'tenants', ['account_type' => 1]);
