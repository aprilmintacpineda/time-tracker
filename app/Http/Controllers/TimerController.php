<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TimerRunRequest;
use App\Task;

class TimerController extends Controller
{
	public function run(TimerRunRequest $request) {
		$task = Task::find($request->id);
		$task->is_playing = true;

		// update first_started
		if (!$task->first_started) {
			$task->first_started = $request->timestamp;
		}

		$task->save();

		return response()->json($task);
	}
}
