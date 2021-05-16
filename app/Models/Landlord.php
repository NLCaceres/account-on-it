<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Landlord extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name', 'surname', 'email'
    ];

    //protected $hidden = [];
    //protected $visible = [];

    public function hideSensitiveData() 
    { //? makeHidden (opposite of makeVisible) removes (for that instance of the eloquent model) specific attributes
        //* Effectively making quick functions like this super useful if constantly hiding certain data
        //? Important to return the value makeHidden returns (the model instance) so any other normal eloquent model Fns can be called on it
        return $this->makeHidden(['created_at', 'updated_at', 'user_id']);
    }

    //! BelongsTo Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //! Has Relationships
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }
}
