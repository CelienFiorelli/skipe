<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function List(int $groupeId): JsonResponse
    {
        if($groupeId <= 0)
            return response("groupe id not lower or equal to 0", 400);

        $userId = Auth::user()->id;

        $list = Message::query()
            ->where("groupe_id", $groupeId)
            ->selectRow("messages.*, IF(user_id = $userId, 1, 0) as i_am_author")
            ->get()
            ->toArray();

        foreach ($list as &$element) 
            $element->i_am_author = $element->i_am_author == 1; 

        return response()->json($list);
    }

    public function Add(MessageRequest $_message, Request $_request)
    {
        $messageRequest = $_message->validated();

        $info = [
            "user_id" => Auth::user()->id,
            "groupe_id" => $messageRequest->groupe_id
        ];
        
        $file = $_request->file("file");

        if($file !== null)
        {
            $name = Carbon::now()->timestamp.rand(0, 100_000).".".$file->getExtension();
            $path = "messageFile/".$messageRequest->groupe_id;
            Storage::putFileAs($path, $file, $name);

            $info["content"] = "$path/$name";
            $info["is_file"] = true;
        }

        $message = Message::query()->create($info);
    }
}
