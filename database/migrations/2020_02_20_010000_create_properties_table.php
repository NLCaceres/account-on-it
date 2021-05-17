<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('street');
            $table->string('city');
            $table->string('state');
            $table->string('postal_code'); //* Accounts for '00302' as well as Canada/UK's 
            $table->string('additional_info')->nullable(); //* Equivalent of address 2!
            $table->unsignedBigInteger('landlord_id');
            $table->foreign('landlord_id')->references('id')->on('landlords');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
