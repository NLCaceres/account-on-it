<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'amount', 'date_paid'
    ];
    public function tenant()
    {
        return $this->belongsTo('App\Tenant');
    }
    public function property()
    {
        return $this->belongsTo('App\Property');
    }
}
