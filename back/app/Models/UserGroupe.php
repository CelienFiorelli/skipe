<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $groupe_id
 * @property int $user_id
 * 
 * @property bool $user_is_quited
 * 
 * @property Groupe $groupe
 * @property User $user
 */
class UserGroupe extends Model
{
    use HasFactory;

    protected $primaryKey = ["groupe_id", "user_id"];

    protected $casts = [
        "user_is_quited" => "boolean"
    ];

    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function groupe(): BelongsTo
    {
        return $this->belongsTo(Groupe::class);
    }
}
