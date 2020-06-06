<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Landlord extends Model
{
    protected $fillable = [
        'first_name', 'surname', 'email'
    ];

    //! BelongsTo Relationships
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    //! Has Relationships
    public function properties()
    {
        return $this->hasMany('App\Property');
    }
    public function tenants()
    {
        return $this->hasMany('App\Tenant');
    }
}
