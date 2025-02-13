<?php

use App\Models\UserGroup;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('group.{id}', function ($user, $id) {
    return UserGroup::query()
        ->where('user_id', $user->id)
        ->where('group_id', $id)->exists();
});
