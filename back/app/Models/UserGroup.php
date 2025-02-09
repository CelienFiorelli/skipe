<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $group_id
 * @property int $user_id
 * 
 * @property bool $user_is_quited
 * 
 * @property Group $group
 * @property User $user
 */
class UserGroup extends Model
{
    use HasFactory;

    protected $primaryKey = ["group_id", "user_id"];

    protected $fillable = [
        "group_id", "user_id", "user_is_quited"
    ];

    protected $casts = [
        "user_is_quited" => "boolean"
    ];

    public $incrementing = false;
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class);
    }
}
