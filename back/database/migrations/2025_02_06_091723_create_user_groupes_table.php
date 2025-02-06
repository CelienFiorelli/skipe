<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_groupes', function (Blueprint $table) {
            $table->unsignedBigInteger("groupe_id");
            $table->unsignedBigInteger("user_id");
            $table->primary(["groupe_id", "user_id"]);
            $table->boolean("user_is_quited")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_groupes');
    }
};
