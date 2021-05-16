<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lease extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'lease_start', 'lease_end'
    ];
    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
