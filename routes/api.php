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

// ? Specifying this middleware means the route requires an API Token for access
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::namespace('API')->group(function () {
    Route::apiResource('users', 'UserController');
    Route::apiResource('tenants', 'TenantController');
    Route::apiResource('landlords', 'LandlordController');
    Route::apiResource('payments', 'PaymentController');
    Route::apiResource('properties', 'PropertyController');
});

//? All regular routes here get prefixed with API! Plus different middleware
// Route::get('/user', function (Request $request) {
//     return Auth::check();
// });
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();

    $userArray = $user->attributesToArray();

    if ($user->role === 1) {
    } else if ($user->account_type === 0) {
        //* Landlord only needs its ID
        $userArray['landlord_id'] = $user->landlord->id;
    } else {
        //* Tenant needs its ID, property, and landlord
        $userArray['tenant_id'] = $user->tenant->id;
        $userArray['property_id'] = $user->tenant->property_id;
        $userArray['landlord_id'] = $user->tenant->landlord_id;
    }

    $userArray['email_verified'] = $user->email_verified_at != null ?: false; //? Elvis operator similar to Kotlin's
    unset($userArray['email_verified_at']); //? Removes an elem (mutable array so no need to reset);

    return response(['message' => 'Logged in', 'user' => $userArray], Response::HTTP_OK);

    return $userArray;
});
