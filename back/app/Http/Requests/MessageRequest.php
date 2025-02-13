<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class MessageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "content" => "string|nullable",
            "file" => [
                "nullable", 
                File::types(["png", "jpg", "jpeg", "svg"])->max("2mb")
            ],
            "group_id" => "required|integer|min:1"
        ];
    }
}
