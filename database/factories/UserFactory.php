<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
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

class UserFactory extends Factory {

    protected $model = User::class;

    public function definition() {
        return [
            'first_name' => $this->faker->firstName(),
            'surname' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            // Hashed password stored //? Theoretically people won't be able to come up with the original pass and login with the fakes
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return $this
     */
    public function configure()
    {
        return $this->afterMaking(function (User $user) {
            //
        })->afterCreating(function (User $user) {
            //? Beware 'and' keyword great for actual conditionals
            //? Bad for creating booleans e.g. $boolVar = TRUE and FALSE => $bool = TRUE ?!!
            if ($user->role === 0 and $user->account_type === 0) {
                // echo "Reg Landlord after create \n";
            }
            elseif ($user->role === 0 and $user->account_type === 1) {
                // echo "Reg Tenant after create \n";
            }
            else {
                // echo "Admin after create \n";
            }
        });
    }

    //* State Manipulation Method
    public function admins() {
        return $this->state(function (array $attributes) { 
            return ['role' => 1];
        });
    }
    public function landlords() {
        return $this->state(function (array $attributes) { 
            return ['account_type' => 0];
        });
    }
    public function tenants() {
        return $this->state(function (array $attributes) { 
            return ['account_type' => 1];
        });
    }
    public function test() {
        return $this->state(function (array $attributes) {
            return [];
        });
    }
}

//? To set up data with specific attribute vals 'state()' works! and accepts a closure too
//? Could also set up data after making (or even after creating [init'ing then saving])
//? BUT 'afterMaking()' & 'afterCreating()' usually are for relating models to each other
//? Can also specify afterMaking/Creating funcs for specific state factories w/ 'afterMakingState/afterCreatingState'

