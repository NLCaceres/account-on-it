<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateTenantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('surname');
            $table->string('email');
            $table->boolean('claimed');
            $table->boolean('current'); //* Current tenants or past ones!
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('property_id')->nullable();
            $table->foreign('property_id')->references('id')->on('properties');
            $table->unsignedBigInteger('lease_id')->nullable();
            $table->foreign('lease_id')->references('id')->on('leases');
            $table->unsignedBigInteger('landlord_id')->nullable();
            $table->foreign('landlord_id')->references('id')->on('landlords');
            $table->timestamps();
        });

        //* Following ensures 'unique' column modifier is case insensitive
        //* JonnyDoe@email.com effectively the same as jonnydoe@email.com and no 2 rows will both have this email
        //? Loads in CaseInsensitiveText (ciText) if needed
        DB::statement('CREATE EXTENSION IF NOT EXISTS citext');
        //? Forces 'email' column to be use citext (form of string datatype)
        DB::statement('ALTER TABLE tenants ALTER COLUMN email TYPE citext');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tenants');
    }
}
