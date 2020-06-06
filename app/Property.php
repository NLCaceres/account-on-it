<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'house_number', 'street', 'state', 'postal_code', 'additional_info'
    ];
    public function landlord()
    {
        return $this->belongsTo('App\Landlord');
    }
    public function lease()
    {
        return $this->hasOne('App\Lease');
    }
    public function tenants()
    {
        return $this->hasMany('App\Tenant');
    }
    public function payments()
    {
        return $this->hasMany('App\Payment');
    }
}
