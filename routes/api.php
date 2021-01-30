<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DataController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('/token', function (Request $request) {
//     return json_encode(csrf_token());
// });

Route::post('/fetch', [DataController::class, 'fetchUsers']);
Route::post('/findAlbum/{user}', [DataController::class, 'findAlbum']);
Route::post('/deleteAlbum/{user}/{album}', [DataController::class, 'deleteAlbum']);
Route::post('/findPhoto/{album}', [DataController::class, 'findPhoto']);
