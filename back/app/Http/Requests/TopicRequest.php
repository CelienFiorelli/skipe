<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TopicRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "token_topic" => "string|required|min:1",
            "name" => "string|required|min:1"
        ];
    }
}
