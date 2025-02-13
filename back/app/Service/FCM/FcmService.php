<?php

namespace App\Service\FCM\FcmService;

use Google\Auth\Credentials\ServiceAccountCredentials;
use Google\Auth\HttpHandler\HttpHandlerFactory;
use Illuminate\Support\Facades\Http;

class FcmService
{
    private string $url;
    private string $token;

    public function __construct(string $_projectId, string $_fileNamePrivateKey)
    {
        $this->url = "https://fcm.googleapis.com/v1/projects/$_projectId/messages:send";

        $crediential = new ServiceAccountCredentials(
            "https://www.googleapis.com/auth/firebase.messaging",
            json_decode(file_get_contents($_fileNamePrivateKey), true)
        );

        $this->token = $crediential->fetchAuthToken(HttpHandlerFactory::build());
    }

    public function Info()
    {
        $url = "https://iid.googleapis.com/iid/info/IID_TOKEN";

        Http::withHeaders([
            "Content-Type: application/json",
            "Authorization: Bearer {$this->token}", 
            "access_token_auth: true"
        ])
        ->get($url);
    }

    public function SendToTopic(string $_topic, string $_title, string $_message): void
    {
        Http::withHeaders([
            "Content-Type: application/json",
            "Authorization: bearer {$this->token}"
        ])
        ->withBody([
            "message" => [
                "topic" => $_topic,
                "notification" => [
                    "title" => $_title,
                    "body" => $_message
                ],
            ],
            "webpush" => [
                "fcm_options" => []
            ]
        ])
        ->get($this->url);
    }

    public function Send(string $_token, string $_title, string $_message): void
    {
        Http::withHeaders([
            "Content-Type: application/json",
            "Authorization: bearer {$this->token}"
        ])
        ->withBody([
            "message" => [
                "token" => $_token,
                "notification" => [
                    "title" => $_title,
                    "body" => $_message
                ],
            ],
            "webpush" => [
                "fcm_options" => []
            ]
        ])
        ->get($this->url);
    }
}