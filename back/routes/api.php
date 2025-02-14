<?php

use App\Http\Controllers\FcmController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware([])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(MessageController::class)->prefix("message")->group(function()
    {
        Route::get("list/{groupId}", "list")
            ->whereNumber("groupId");

        Route::post("add", "add");
        Route::put("{message}", "update");
        Route::delete("{message}", "destroy");
        Route::get("file", "fichier");
    });

    Route::controller(GroupController::class)->prefix("group")->group(function()
    {
        Route::get("list", "list");
        Route::post("add", "add");
        Route::post("add-member", "addMember");
        Route::delete("delete-member", "deleteMember");
    });

    Route::controller(FcmController::class)->prefix("fcm")->group(function()
    {
        Route::get("send/{token}", "Send");
        Route::post("send-to-topic", "SendToTopic");
        Route::post("register-topic", "RegisterTopic");
        Route::delete("delete-topic/{tokenTopic}", "DeleteTopic");
    });
});

