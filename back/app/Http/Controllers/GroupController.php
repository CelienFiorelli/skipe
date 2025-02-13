<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupMemberRequest;
use App\Http\Requests\GroupRequest;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Models\User;
use App\Models\UserGroup;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GroupController extends Controller
{
    public function list(): JsonResponse
    {
        /** @var User */
        $user = Auth::user();
        $groups = $user->groups();

        return response()->json(GroupResource::collection($groups));
    }

    public function add(GroupRequest $_request): JsonResponse
    {
        $info = $_request->validated();

        try {
            DB::beginTransaction();
            $group = Group::create([
                "name" => $info["name"]
            ]);
    
            $userIds = User::query()
                ->whereIn('pseudo', $info["userIdList"])
                ->orWhere('id', Auth::id())
                ->pluck('id');
            foreach ($userIds as $userId)
            {
                UserGroup::create([
                    "user_id" => $userId,
                    "group_id" => $group->id,
                    "user_is_quited" => false
                ]);
            }

            DB::commit();
            return response()->json(["groupId" => $group->id]);
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function addMember(GroupMemberRequest $_request)
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

    public function deleteMember(GroupMemberRequest $_request)
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
