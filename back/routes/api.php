<?php

use App\Http\Controllers\GroupeController;
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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(MessageController::class)->prefix("message")->group(function()
    {
        Route::get("list/{groupeId}", "List")
            ->whereNumber("groupeId");

        Route::post("add", "Add");
        Route::get("file", "Fichier");
    });

    Route::controller(GroupeController::class)->prefix("groupe")->group(function()
    {
        Route::get("list", "List");
    });
});

