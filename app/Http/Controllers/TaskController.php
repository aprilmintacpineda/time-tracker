<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Task;

class TaskController extends Controller
{
	public function paginate($count = 1) {
		$limit = 10;
		$offset = ($limit * $count) - $limit;

		return Task::offset($offset)
			->limit($limit)
			->get();
	}

	public function view($id) {
		try {
			return Task::findOrFail($id)->first();
		} catch (ModelNotFoundException $e) {
			return abort(404);
		}
	}
}
