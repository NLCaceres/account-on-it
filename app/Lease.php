<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lease extends Model
{
    protected $fillable = [
        'lease_start', 'lease_end'
    ];
    public function tenants()
    {
        return $this->hasMany('App\Tenant');
    }
    public function property()
    {
        return $this->belongsTo('App\Property');
    }
}
