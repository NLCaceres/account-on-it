<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:40',
            'surname' => 'required|string|max:40',
            'email' => 'required|string|email|max:64|unique:users', //? Cont. from Landlords Req: unique will default to key for column name
            'password' => 'required|string|min:8|max:64' //? 8 chars with chars, nums, symbols
        ];
    }
}
