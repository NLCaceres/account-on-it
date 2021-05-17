<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

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

//? ALL Routes declared here get '/api/' prefixed on them! No writing it out needed

// ? Specifying this middleware means the route requires an API Token for access
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('login-check', 'Auth\LoginController@loginCheck');

Route::namespace('API')->group(function () {
    Route::apiResource('users', 'UserController');
    Route::apiResource('tenants', 'TenantController');
    Route::apiResource('landlords', 'LandlordController');
    Route::apiResource('payments', 'PaymentController');
    Route::apiResource('properties', 'PropertyController');
});

