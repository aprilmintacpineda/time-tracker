<?php
// collections routes
Route::get('collections/paginate/{count}', 'CollectionController@paginate');
Route::get('collections/view/{id}', 'CollectionController@view');
Route::post('collections/create', 'CollectionController@create');
Route::patch('collections/edit/{id}', 'CollectionController@edit');
Route::delete('collections/delete/{id}', 'CollectionController@delete');
// tasks routes
Route::get('tasks/paginate/{count}', 'TaskController@paginate');
Route::get('tasks/view/{id}', 'TaskController@view');
Route::post('tasks/create', 'TaskController@create');
Route::patch('tasks/edit/{id}', 'TaskController@edit');
Route::delete('tasks/delete/{id}', 'TaskController@delete');
// running / stopping timer
Route::post('timer/run', 'TimerController@run');
Route::post('timer/stop', 'TimerController@stop');
// landing routes
Route::get('/', 'LandingController@index');
Route::get('{slug}', 'LandingController@index')
  ->where('slug', '(.*)?');

