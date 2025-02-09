<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupMemberRequest;
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
                "group_id" => $group->id,
                "user_is_quited" => false
            ]);
        }

        return response()->json(["groupId" => $group->id]);
    }

    public function AddMember(GroupMemberRequest $_request)
    {
        $info = $_request->validated();

        $userGroup = UserGroup::query()
            ->where([
                ["group_id", "=", $info["group_id"]],
                ["user_id", "=", $info["user_id"]]
            ])
            ->first();

        if($userGroup === null)
        {
            $userGroup = UserGroup::query()
                ->create([
                    "group_id" => $info["group_id"],
                    "user_id" => $info["user_id"],
                ]);

            $ok = $userGroup->id != 0;
        }
        else
        {
            $nb = UserGroup::query()
                ->where([
                    ["group_id", "=", $info["group_id"]],
                    ["user_id", "=", $info["user_id"]]
                ])
                ->update([ "user_is_quited" => false ]);

            $ok = $nb > 0;
        }

        return $ok ? response()->noContent() : response("", 500)->json(["message" => "impossible d'ajouter un membre au groupe"]);
    }

    public function DeleteMember(GroupMemberRequest $_request)
    {
        $info = $_request->validated();

        $nb = UserGroup::query()
            ->where([
                ["group_id", "=", $info["group_id"]],
                ["user_id", "=", $info["user_id"]]
            ])
            ->update([ "user_is_quited" => true ]);

        return $nb > 1 ? response()->noContent() : response("", 404);
    }
}
