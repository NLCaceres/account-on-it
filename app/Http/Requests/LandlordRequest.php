<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LandlordRequest extends FormRequest
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
            'email' => 'required|string|email|max:64|unique:landlords' //? Unique acts similar to a function taking the DB table and column name
        ];
    }
}
