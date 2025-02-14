<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SendTopicRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "topic_name" => "string|required",
            "title" => "string|required",
            "message" => "string|max:200|required"
        ];
    }
}
