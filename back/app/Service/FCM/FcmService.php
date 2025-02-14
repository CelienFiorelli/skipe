<?php

namespace App\Service\FCM;

use Google\Auth\Credentials\ServiceAccountCredentials;
use Google\Auth\HttpHandler\HttpHandlerFactory;

class FcmService
{
    private string $urlSendNotification;
    private string $urlBaseTopic = "https://iid.googleapis.com/iid/v1";
    private string $token;
    private string $pathFileNamePrivateKey;

    public function __construct(string $_projectId, string $_fileNamePrivateKey)
    {
        $this->urlSendNotification = "https://fcm.googleapis.com/v1/projects/$_projectId/messages:send";
        $this->pathFileNamePrivateKey = $_fileNamePrivateKey;
        $this->Init();
    }

    // /**
    //  * NE MARCHE PAS
    //  * @return array Donne une liste d'erreur FCM ["message", "code"]
    //  */
    // public function SubscribeToTopic(string $_topicName, array $_tokenClientList): array
    // {
    //     $ch = curl_init($this->urlBaseTopic.":batchAdd");

    //     curl_setopt($ch, CURLOPT_HTTPHEADER, [
    //         "Authorization: Bearer ".$this->token,
    //         "Content-Type: application/json",
    //         "access_token_auth" => true
    //     ]);

    //     curl_setopt($ch, CURLOPT_POSTFIELDS, '{
    //         "to": "/topic/"'.$_topicName.'",
    //         "registration_tokens": "'.json_encode($_tokenClientList).'"
    //     }');

    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "post");
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);

    //     $response = curl_exec($ch);

    //     $json = json_decode($response);

    //     if(isset($json->error))
    //     {
    //         $error = $json->error;

    //         return [
    //             "message" => $error->message,
    //             "code" => $error->code
    //         ];
    //     }

    //     return [];
    // }

    // /**
    //  * NE MARCHE PAS
    //  * @return array Donne une liste d'erreur FCM ["message", "code"]
    //  */
    // public function UnsubscribeToTopic(string $_topicName, array $_tokenClientList): array
    // {
    //     $ch = curl_init($this->urlBaseTopic.":batchRemove");

    //     curl_setopt($ch, CURLOPT_HTTPHEADER, [
    //         "Authorization: Bearer ".$this->token,
    //         "Content-Type: application/json",
    //         "access_token_auth" => true
    //     ]);

    //     curl_setopt($ch, CURLOPT_POSTFIELDS, '{
    //         "to": "/topic/"'.$_topicName.'",
    //         "registration_tokens": "'.json_encode($_tokenClientList).'"
    //     }');

    //     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "post");
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);

    //     $response = curl_exec($ch);

    //     $json = json_decode($response);

    //     if(isset($json->error))
    //     {
    //         $error = $json->error;

    //         return [
    //             "message" => $error->message,
    //             "code" => $error->code
    //         ];
    //     }

    //     return [];
    // }

    /**
     * @return array Donne une liste d'erreur FCM ["message", "code"]
     */
    public function SendToTopic(string $_topicName, string $_title, string $_message): array
    {
        $ch = curl_init($this->urlSendNotification);

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer ".$this->token,
            "Content-Type: application/json"
        ]);

        curl_setopt($ch, CURLOPT_POSTFIELDS, '{
            "message":{
                "topic":"'.$_topicName.'",
                "notification":{
                    "title": "'.$_title.'",
                    "body":"'.$_message.'"
                }
            }
        }');

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "post");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);

        $response = curl_exec($ch);

        $json = json_decode($response);

        if(isset($json->error))
        {
            $error = $json->error;

            return [
                "message" => $error->message,
                "code" => $error->code
            ];
        }

        return [];
    }

    /**
     * @return array Donne une liste d'erreur FCM ["message", "code"]
     */
    public function Send(array $_tokenClientList, string $_title, string $_message, bool $_retry = false): array
    {
        $responseErrorList = [];

        foreach ($_tokenClientList as $element)
        {
            $ch = curl_init($this->urlSendNotification);

            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                "Authorization: Bearer ".$this->token,
                "Content-Type: application/json"
            ]);

            curl_setopt($ch, CURLOPT_POSTFIELDS, '{
                "message":{
                    "token":"'.$element.'",
                    "notification":{
                        "title": "'.$_title.'",
                        "body":"'.$_message.'"
                    }
                }
            }');

            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "post");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER , true);

            $response = curl_exec($ch);

            $json = json_decode($response);

            if(isset($json->error))
            {
                $error = $json->error;

                if($error->code == 401 && $_retry === false)
                {
                    $this->Init();
                    $this->Send($_tokenClientList, $_title, $_message, true);
                }
                else
                {
                    $responseErrorList[] = [
                        "message" => $error->message,
                        "code" => $error->code
                    ];

                    if($error->code == 401)
                        break;
                }
            }
        }

        return $responseErrorList;
    }

    private function Init(): void
    {
        $crediential = new ServiceAccountCredentials(
            "https://www.googleapis.com/auth/firebase.messaging",
            json_decode(file_get_contents($this->pathFileNamePrivateKey), true)
        );

        $this->token = $crediential->fetchAuthToken(HttpHandlerFactory::build())["access_token"];
    }
}