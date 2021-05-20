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
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Route::get('/', function () {
//   return phpinfo();
// });
//Route::get('/home', 'HomeController@index')->name('home');

//Auth::routes(); //? Laravel default config for authentication (can also remove routes if needed by adding as params)
Route::prefix('api')->group(function () { //? All ths post routes available from default Auth
  //! Auth
  Route::post('login', 'Auth\LoginController@login'); //* Throttles 5 attempts per minute
  Route::post('logout', 'Auth\LoginController@logout'); //* All in loginController
  Route::post('register', 'Auth\RegisterController@register')->middleware(['throttle:5,1']);
  Route::post('confirm-password', 'Auth\ConfirmPasswordController@confirm')->middleware(['throttle:5,1']);
  Route::post('forgot-password', 'Auth\ForgotPasswordController@sendResetLinkEmail')->middleware(['throttle:5,60']);
  Route::post('login/forgot-password', 'VueController@recaptcha')->middleware(['throttle:15,1']); //? Bonus route to use recaptchaV3
  Route::post('reset-password', 'Auth\ResetPasswordController@reset')->middleware(['throttle:5,1']);
  Route::get('login-check', 'VueController@loginCheck');

  //! Email-Verification - 3 Steps -> Notice, Verify, Re-send
  //* name('verification.notice') - Route to use if Actual Email notification needs major customization
  //? Since following is handled in an email, sending the GET request to following route
  //? With proper ID & hash injected, we can fulfill and redirect (hopefully properly w/ Vue)
  Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill(); //* Marks user as verified thanks to User Model Authenticatable extension

    return redirect('/'); //* Since it's required that user be logged in just redirect home
  })->middleware(['auth', 'signed'])->name('verification.verify');
  Route::post('/verify-email-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    //* Following line, sends previous location as a redirect!
    return back()->with('message', 'Verification link sent!');
  })->middleware(['auth', 'throttle:5,1'])->name('verification.send'); //* Route to re-send verification email
  //? Throttle:6,1 limits to 6 requests to verification.send route per minute
  // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  //   //? Auth facade only seems to work w/ the web routes
  //   return Auth::user(); //? Sends all info but password
  // });
});

Route::get('/{any}', 'VueController@index')->where('any', '.*')->name('front-end');
