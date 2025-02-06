<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Groupe;
use App\Models\Image;
use App\Models\Message;
use App\Models\User;
use App\Models\UserGroupe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::create([
            "pseudo" => "pseudo",
            "email" => "a@a.com",
            "password" => Hash::make("azeaze"),
            "email_verified_at" => now()
        ]);
        
        $user2 = User::create([
            "pseudo" => "pseudo2",
            "email" => "b@a.com",
            "password" => Hash::make("azeaze"),
            "email_verified_at" => now()
        ]);

        $groupe = Groupe::create([
            "name" => "groupe 1"
        ]);

        UserGroupe::created([
            "user_id" => $user->id,
            "groupe_id" => $groupe->id
        ]);

        UserGroupe::created([
            "user_id" => $user2->id,
            "groupe_id" => $groupe->id
        ]);

        Message::create([
            "user_id" => $user->id,
            "groupe_id" => $groupe->id,
            "content" => "salut",
            "is_file" => false
        ]);

        Message::create([
            "user_id" => $user2->id,
            "groupe_id" => $groupe->id,
            "content" => "salut 2",
            "is_file" => false
        ]);
    }
}
