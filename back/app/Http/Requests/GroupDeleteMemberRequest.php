<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GroupDeleteMemberRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            "group_id" => "required|integer|min:1|exists:groups,id",
            "user_id" => "required|integer|min:1|exists:users,id"
        ];
    }
}
