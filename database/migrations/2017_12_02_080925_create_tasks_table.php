<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->bigInteger('id')->unsigned()->primary();
            $table->string('title', 255);
            $table->string('description', 255)->nullable();
            $table->bigInteger('collection_id')->unsigned()->nullable();
            $table->boolean('is_playing')->default(false);
            $table->timestamp('first_started')->nullable();
            $table->timestamp('last_stopped')->nullable();
            $table->timestamps();

            $table->foreign('collection_id')->references('id')->on('collections');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
