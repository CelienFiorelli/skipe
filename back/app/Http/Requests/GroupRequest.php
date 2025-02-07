<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "name" => "required|string|min:1",
            "userIdList" => "required|array",
            "userIdList.*" => "integer|min:1|exists:users,id"
        ];
    }
}
