<?php

namespace Database\Factories;

use App\Models\Lease;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeaseFactory extends Factory {

    protected $model = Lease::class;

    public function definition() {
        return [
            'lease_start' => Carbon::now(),
            'lease_end' => Carbon::now()->addYear(),
        ];
    }

    //* State Manipulation Method
    public function past() {
        return $this->state(function (array $attributes) { 
            $least_start = Carbon::now()->subYears(rand(2, 15));
            return [
                'lease_start' => $least_start,
                'lease_end' => $least_start->addYear()
            ];
        });
    }
}
