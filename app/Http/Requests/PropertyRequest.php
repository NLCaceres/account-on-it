<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PropertyRequest extends FormRequest
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
            'street' => 'required|max:264',
            'city' => 'required|max:264',
            'state' => 'required|max:264',
            'postal_code' => 'required|numeric|max:12',
            'additional_info' => 'nullable'
        ];
    }
}
