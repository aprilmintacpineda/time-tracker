<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	protected $fillable = [
		'id',
		'title',
		'description',
		'collection_id',
		'is_playing',
		'first_started',
		'last_stopped',
		'secondsSpent'
	];
}
