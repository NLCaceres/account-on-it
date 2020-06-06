<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('vue');
// });
//Route::get('/home', 'HomeController@index')->name('home');

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Route::get('/{any}', 'VueController@index')->where('any', '.*');

//Auth::routes(); //? Laravel default config for authentication (can also remove routes if needed by adding as params)
Route::prefix('api')->group(function () { //? All ths post routes available from default Auth
  Route::post('login', 'Auth\LoginController@login');
  Route::post('logout', 'Auth\LoginController@logout');
  Route::post('register', 'Auth\RegisterController@register');
  Route::post('confirm-password', 'Auth\ConfirmPasswordController@confirm');
  Route::post('login/forgot-password', 'VueController@recaptcha'); //? Bonus route to use recaptchaV3
  Route::post('forgot-password', 'Auth\ForgotPasswordController@sendResetLinkEmail');
  Route::post('reset-password', 'Auth\ResetPasswordController@reset');
  // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  //   //? Interestingly Auth facade only works w/ the web middleware!
  //   return Auth::user(); //? Sends all info but password
  // });
});
