<?php

use App\Models\UserGroupe;
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
    return UserGroupe::query()
        ->where('user_id', $user->id)
        ->where('groupe_id', $id)->exists();
});

Broadcast::channel('public-updates', function () {
    return true;
});