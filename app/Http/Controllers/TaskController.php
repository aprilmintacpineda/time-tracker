<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CreateTasksRequest;
use App\Task;
use App\Helpers\Generators;

class TaskController extends Controller
{
	public function paginate($count = 1) {
		$limit = 10;
		$offset = ($limit * $count) - $limit;

		return Task::offset($offset)
			->limit($limit)
			->orderBy('created_at', 'desc')
			->get();
	}

	public function view($id) {
		try {
			return Task::findOrFail($id)->first();
		} catch (ModelNotFoundException $e) {
			return abort(404);
		}
	}

	public function create(CreateTasksRequest $request) {
		$createdTasks = [];

		foreach($request->get('tasks') as $task) {
			$createdTasks[] = Task::create([
				'id' => Generators::uniqueId(),
				'title' => $task['title'],
				'description' => $task['description']
			]);
		}

		return $createdTasks;
	}
}
