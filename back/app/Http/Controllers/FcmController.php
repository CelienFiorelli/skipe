<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicRequest;
use App\Models\FcmTopic;
use App\Service\FCM\FcmService\FcmService;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class FcmController extends Controller
{
    public function __construct(private FcmService $fcmServ) { }

    public function Info()
    {
        $url = "https://iid.googleapis.com/iid/info/";
        /**
         * https://iid.googleapis.com/iid/info/nKctODamlM4:CKrh_PC8kIb7O...clJONHoA
         *   Content-Type:application/json
         *   Authorization: Bearer ya29.ElqKBGN2Ri_Uz...HnS_uNreA
         *   access_token_auth: true
         */

        
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
