<?php

namespace App\Helpers;

class Generators {
	public static function uniqueId() {
		return rand(111111111111, 999999999999);
	}
}