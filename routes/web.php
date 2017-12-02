<?php

Route::get('/', 'LandingController@index');

Route::get('{slug}', 'LandingController@index')
  ->where('slug', '(.*)?');

