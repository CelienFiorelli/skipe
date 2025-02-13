<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $token_topic
 * @property string $name
 */
class FcmTopic extends Model
{
    use HasFactory;

    protected $fillables = [
        "name", "token_topic"
    ];
}
