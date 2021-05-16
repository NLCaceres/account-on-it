<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
//use Laravel\Passport\HasApiTokens;
use Laravel\Sanctum\HasApiTokens; //? Turns out there's a separate one for Passport vs Sanctum

//? Implements MustVerifyEmail is important for Email Verification System
class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'surname', 'email', 'password', 'account_type'
    ]; //* Any field not here will not be allowed to update by HTTP requests
    //? Since 'role' is not here, no malicious users can use a script or Postman 
    //? to fire POSTs at the api and become admins
    //* How to make people admins then? A combination of techniques!
    //* Protect the route! Only auth'd admins can grant it!
    //* Extend base user model with adminUser that includes 'role' in $fillable 

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token', 'password'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    //* Default Values */
    protected $attributes = [
        'role' => 0, //* 0 - normal, 1 - admin, 2 - super
        'account_type' => 0 //* 0 - Landlord, 1 - tenant
    ];

    //! Has Relationships
    public function landlord()
    //? Use withDefault rather than simply sending null if needed. It sends a model with null prop vals
    { //? Model attributes are available!
        return $this->hasOne(Landlord::class)->withDefault(['id'=> -1, 'user_id'=> $this->id]);
    }
    public function tenant()
    { //* Defaulting IDs to -1 prevents any policies from matching two null values
        //* and allowing an unregistered tenant to be seen by landlord user without a landlord id (as unlikely a case as it may be)
        return $this->hasOne(Tenant::class)->withDefault(['id'=> -1, 'user_id'=> -1, 'landlord_id'=> -1, 'lease_id'=> -1, 'property_id'=> -1]);  
    }
    //! Has Through Relationships - Landlord
    public function tenants() 
    {
        return $this->hasManyThrough(Tenant::class, Landlord::class);
    }
    public function properties()
    {
        return $this->hasManyThrough(Property::class, Landlord::class);
    }
    //! Has Through Relationships - Tenant
    public function payments() 
    {
        return $this->hasManyThrough(Payment::class, Tenant::class, 'user_id', 'paid_by');
    } 
}
