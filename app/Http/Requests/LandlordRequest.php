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
        $landlord = $request->route()->parameter('landlord'); //* So instead grab the route from the $request and take the model instance param!
        //* Since store/create don't get an injected instance in the controller, $landlord being null is fine, we can still guarantee uniqueness of the field
        //* Because there's no DB row to ignore unlike in the update route
        return [
            'first_name' => 'required|string|max:40',
            'surname' => 'required|string|max:40',
            //? Using Rule class gets a few helpers like ignore! Which helps prevent the issue of when a user sends info that matches the current value in the DB
            //* Matching values with 'unique' throw a validation error stating 'value was already taken', 
            //* So using ignore() prevents a check to that model's DB row, ensuring uniqueness but stopping the error
            'email' => ['required', 'string', 'email', 'max:64', Rule::unique('landlords')->ignore($landlord)],
            'user_id' => 'numeric'
        ];
    }
}
