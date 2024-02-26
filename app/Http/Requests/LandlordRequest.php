<?php

namespace App\Http\Requests;

use App\Models\Landlord;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class LandlordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {   //* DependencyInjection only seems to work for Request, not model instances like in a controller
        $landlord = $request->route()->parameter('landlord'); //* So instead grab the route from the $request THEN take the model instance param!
        //* Since store (aka create) doesn't get an injected Landlord in LandlordController@store, parameter('landlord') returns a null $landlord
        //* so Rule::unique's ignore() won't be applied in that case, letting the 'email' field be compared to all of the DB's emails
        return [
            'first_name' => 'required|string|max:40',
            'surname' => 'required|string|max:40',
            //? The Rule class has a few helpers like ignore() that can supercharge relatively basic rules like 'unique:table,column'
            //? In this case, without ignore(), unique() can mistake the incoming but unchanged 'email' value with its own email value already in the DB
            'email' => ['required', 'string', 'email', 'max:64', Rule::unique('landlords')->ignore($landlord)], //? The email sent MUST NOT match any in the DB
            'user_id' => ['exists:users,id', 'numeric', Rule::requiredIf($request->method() === 'POST')] //* Require ONLY if 'POST' aka creating a new Landlord
        ]; //? 'exists' checks the 'users' table for an 'id' with the same value as 'user_id'
    }
}
