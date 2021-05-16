<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount', 'date_paid'
    ];
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
