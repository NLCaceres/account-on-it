<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Lease;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Lease::class, function (Faker $faker) {
    return [
        'lease_start' => Carbon::now(),
        'lease_end' => Carbon::now()->addYear(),
    ];
});

$factory->state(Lease::class, 'past', function () {
    $least_start = Carbon::now()->subYears(rand(2, 15));
    return [
        'lease_start' => $least_start,
        'lease_end' => $least_start->addYear()
    ];
});
