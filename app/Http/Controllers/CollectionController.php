<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Collection;

class CollectionController extends Controller
{
	public function paginate($count = 1) {
		$limit = 10;
		$offset = ($limit * $count) - $limit;

		return Collection::offset($offset)
			->limit($limit)
			->get();
	}

	public function view($id) {
		try {
			return Collection::findOrFail($id)->first();
		} catch (ModelNotFoundException $e) {
			return abort(404);
		}
	}
}
