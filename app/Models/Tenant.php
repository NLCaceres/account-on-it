<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;
    // ? Eloquent models have expected vars!
    //? $table will override the associated table name, $primaryKey to override standard id col
    // protected $table = "my_tenants";
    // ? Otherwise table name is simply plural of the model - 'tenants'

    // ? $fillable vs $guarded (use 1), 
    protected $fillable = [ // ? If used, anything not here will be guarded. Field Injections will only work on these attrs
        'first_name',
        'surname',
        'email'
    ];

    // ? For default attributes use 
    // protected $attributes = [ 'attr1' => val ];

    //! Has Relationships
    // ? $timestamps = false will get rid of created_at & updated_at cols, $dateFormat & const CREATED_AT/UPDATED_AT to rename also available
    public function payments()
    {
        return $this->hasMany(Payment::class, "paid_by");
    }

    //! BelongsTo Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
    public function lease()
    {
        return $this->belongsTo(Lease::class);
    }
    public function landlord()
    {
        return $this->belongsTo(Landlord::class);
    }
}
