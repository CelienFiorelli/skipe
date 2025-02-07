<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property string $pseudo
 * @property string $name
 * @property string $email
 * @property string $password
 * 
 * @property Message[] $messages
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'pseudo',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    /**
     * @return Group[]
     */
    public function groups()
    {
        return $this->join(
            (new UserGroup())->getTable()." as ug",
            "ug.user_id",
            "=",
            "users.id"
        )
        ->where([
            ["ug.user_id", $this->id],
            ["user_is_quited", false]

        ])
        ->get();
    }
}
