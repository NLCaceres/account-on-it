<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    //* False will immediately deny the user making the requesting
    public function authorize()
    { //* True will allow gates & policies to handle it
        //? Use Laravel Gates & Policies (probably policies due to their model association) 
        //? to verify if user can interact with this piece of data
        return true; 
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    { //* Thanks to DepInject, could actually send in different set of rules for different routes or under diff conditions!
        //? Dependency Injection can only seem to grab the $request here though! so grabbing param from it's route works!
        $user = $request->route()->parameter('user');
        //? Thanks to DI, the request instance could also be used to grab the user making the request if needed
        return [
            'first_name' => 'required|string|max:40',
            'surname' => 'required|string|max:40',
            'email' => ['required', 'string', 'email', 'max:64', Rule::unique('users')->ignore($user)],
            //? Unique as seen below with a delim string acts similar to a function taking the DB table and column name'
            //'email' => 'required|string|email|max:64|unique:users', //? Unique will default to primary key for column name
            'password' => 'required|string|min:8|max:64|confirmed', //? 8 chars with chars, nums, symbols
            'account_type' => 'required|integer|numeric|in:0,1', 
        ];
    }
}
