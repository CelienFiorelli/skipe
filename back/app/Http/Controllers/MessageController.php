<?php

namespace App\Http\Controllers;

use App\Events\MessageCreateEvent;
use App\Events\MessageDeleteEvent;
use App\Events\MessageUpdateEvent;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Models\User;
use App\Service\FCM\FcmService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class MessageController extends Controller
{
    public function __construct(private FcmService $fcmServ) { }

    public function list(int $groupId)
    {
        if($groupId <= 0)
            return response("groupe id not lower or equal to 0", 400);

        $list = Message::query()
            ->with('user:id,pseudo')
            ->where("group_id", $groupId)
            ->get();

        return response()->json($list);
    }

    public function fichier(Request $_request): StreamedResponse | Response
    {
        $path = $_request->query->getString("path");

        if($path === null)
            return response("il me faut le chemin du fichier", 400);

        return Storage::download($path);
    }

    public function add(MessageRequest $_request): JsonResponse
    {
        $messageRequest = $_request->validated();

        $info = [
            "user_id" => Auth::user()->id,
            "group_id" => $messageRequest["group_id"]
        ];

        $file = $_request->file("file");

        if($file !== null)
        {
            $name = Carbon::now()->timestamp.rand(0, 100_000).".".$file->extension();
            $path = "messageFile/".$messageRequest["group_id"];
            Storage::putFileAs($path, $file, $name);

            $info["content"] = "$path/$name";
            $info["is_file"] = true;
        }
        else
            $info["content"] = $messageRequest["content"];

        $message = Message::query()->create($info);
        $message->load('user:id,pseudo');

        broadcast(new MessageCreateEvent($messageRequest["group_id"], $message));
        $tokens = User::query()->whereHas('userGroups', function ($q) use ($info) {
            $q->where('group_id', $info['group_id']);
        })->pluck('firebase_token');
        dd($tokens);
        $errorList = $this->fcmServ->Send([$token], "titre", "message");
        
        return response()->json($message);
    }

    
    public function update(Message $message, MessageRequest $request)
    {
        $validated = $request->validated();

        $message->update($validated);
        $message->save();
        $message->load('user:id,pseudo');

        broadcast(new MessageUpdateEvent($message->group_id, $message));
        response()->json($message);
    }

    public function destroy(Message $message)
    {
        Message::query()
            ->where('id', $message->id)
            ->where('user_id', Auth::user()->id)
            ->delete();

        broadcast(new MessageDeleteEvent($message->group_id, $message->id));
        return response()->noContent();
    }

    public function saveToken(Request $request)
    {
        $validated = $request->validate([
            'token' => ['required', 'string']
        ]);

        /**
         * @var User
         */
        $user = Auth::user();

        $user->firebase_token = $validated['token'];
        $user->save();

        return response()->noContent();
    }
}
