<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupDeleteMemberRequest;
use App\Http\Requests\GroupRequest;
use App\Models\Group;
use App\Models\UserGroup;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function List(): JsonResponse
    {
        /** @var User */
        $user = Auth::user();

        return response()->json($user->groups());
    }

    public function Add(GroupRequest $_request): JsonResponse
    {
        $info = $_request->validated();

        $group = Group::create([
            "name" => $info["name"]
        ]);

        $info["userIdList"][] = Auth::user()->id;

        foreach ($info["userIdList"] as $element)
        {
            UserGroup::create([
                "user_id" => $element,
                "group_id" => $group->id
            ]);
        }

        return response()->json(["groupId" => $group->id]);
    }

    public function DeleteMember(GroupDeleteMemberRequest $_request)
    {
        $info = $_request->validated();

        $nb = UserGroup::query()
            ->where([
                ["group_id", "=", $info["group_id"]],
                ["user_id", "=", $info["user_id"]]
            ])
            ->update([ "user_is_quited" => false ]);

        return $nb > 1 ? response()->noContent() : response("", 404);
    }
}
