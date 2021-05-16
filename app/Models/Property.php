<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'house_number', 'street', 'state', 'postal_code', 'additional_info'
    ];
    public function landlord()
    {
        return $this->belongsTo(Landlord::class);
    }
    public function lease()
    {
        return $this->hasOne(Lease::class);
    }
    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
