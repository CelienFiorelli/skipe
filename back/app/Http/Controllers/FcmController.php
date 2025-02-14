<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicRequest;
use App\Models\FcmTopic;
use App\Service\FCM\FcmService;
use Illuminate\Http\Response;

class FcmController extends Controller
{
    public function __construct(private FcmService $fcmServ) { }

    public function Send(string $token)
    {
        $errorList = $this->fcmServ->Send([$token], "titre", "message");

        return count($errorList) == 0 ? response()->noContent() : response(status: 400)->json($errorList);
    }

    public function RegisterTopic(TopicRequest $_request): Response
    {
        $info = $_request->validated();

        FcmTopic::create([
            "name" => $info["name"],
            "token_topic" => $info["token_topic"]
        ]);

        return response()->noContent();
    }

    public function DeleteTopic(string $tokenTopic): Response
    {
        $ok = FcmTopic::where("token_topic", $tokenTopic)->delete();

        return $ok ? response()->noContent() : response(status: 404);
    }
}
