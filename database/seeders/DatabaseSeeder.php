<?php

namespace Database\Seeder;

use Illuminate\Database\Seeder;

//* Current usage:
//* Set Env variables for php artisan migrate:refresh
//* 'TEST_USER=bam TEST_LANDLORD=bum php artisan migrate:refresh'
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([UsersTableSeeder::class]);
    }
}
