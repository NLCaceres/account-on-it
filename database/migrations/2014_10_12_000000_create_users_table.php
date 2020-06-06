<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('surname');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('role')->default(0); //? 0 - normal, 1 - admin, 2 - super
            $table->integer('account_type')->default(0); //? 0 - Landlord, 1 - tenant
            $table->rememberToken();
            $table->timestamps();
        });

        //* Following ensures 'unique' column modifier is case insensitive
        //* JonnyDoe@email.com effectively the same as jonnydoe@email.com and no 2 rows will both have this email
        //? Loads in CaseInsensitiveText (ciText) if needed
        DB::statement('CREATE EXTENSION IF NOT EXISTS citext');
        //? Forces 'email' column to be use citext (form of string datatype)
        DB::statement('ALTER TABLE users ALTER COLUMN email TYPE citext');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
