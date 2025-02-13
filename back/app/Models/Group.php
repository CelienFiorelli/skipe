<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * 
 * @property Message[] $messages
 * @property User[] $users
 */
class Group extends Model
{
    use HasFactory;

    protected $fillable = [
        "name"
    ];

    public $timestamps = false;

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function userGroups(): HasMany
    {
        return $this->hasMany(UserGroup::class);
    }
}
