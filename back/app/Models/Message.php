<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $group_id
 * @property string $content
 * @property bool $is_file
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * 
 * @property User $user
 * @property Group $group
 */
class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id", "group_id", "content", "is_file"
    ];

    protected $casts = [
        "created_at" => "datetime",
        "updated_at" => "datetime",
        "is_file" => "boolean"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
