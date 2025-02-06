<?php

namespace App\Http\Controllers;

use App\Models\UserGroupe;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupeController extends Controller
{
    public function List(): JsonResponse
    {
        /** @var User */
        $user = Auth::user();

        return response()->json($user->groupes());
    }
}
