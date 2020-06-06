<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LeaseRequest extends FormRequest
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
            'lease_start' => 'required|date|after:-2 year|before:+2 year', //? Could alternatively use date_format:rfc7231 (basic format)
            'lease_end' => 'required|date|after:-2 year|before:+2 year',
        ];
    }
}
