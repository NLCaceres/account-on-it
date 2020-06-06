<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;

use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //? Why? Guest middleware deals w/ unauthenticated users! Authenticated users never use this! Perfect!
        $this->middleware('guest')->except('logout');
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $landlord
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        //* Mostly identical to AuthenticatesUsers trait login method below 
        //* EXCEPT we use a case insensitive search for a user with a matching email 
        //* updating only the email part of the credentials before attempting Login

        $this->validateLogin($request); //? All methods from AuthenticatesUsers trait are fair game!

        //? AuthUsers trait uses ThrottlesLogins trait which grabs username and IP to do so. 
        if (
            method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request) //? All traits that AuthenticatesUsers 'use's are also fair game!
        ) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        $credentials = $this->credentials($request);
        //* Case insensitive search
        $user = User::firstWhere('email', 'ilike', $credentials['email']); //? Could add '%' to either side for substring search
        $credentials['email'] = $user['email']; //* Only update email (otherwise will not be case insensitive)

        $loginAttempt = $this->guard()->attempt(
            $credentials,
            $request->filled('remember')
        );

        if ($loginAttempt) { //* This section changed from AuthenticatesUsers to override
            return $this->sendLoginResponse($request);
        }

        //? Login attempt unsuccessful, if over max # of attempts lock out user. Redirect from Vue if needed
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        //* Getting an array w/ relations, adding in an attr in place of 'email_verified_at', and sending
        $userArray = $user->attributesToArray();

        if ($user->account_type === 0) {
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
    }

    /**
     * The user has logged out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function loggedOut(Request $request)
    {   //? If HTTP_NO_CONTENT then no data will ever be sent! Does not matter if you add any, it will NOT send it
        return response(['message' => 'Logged out'], Response::HTTP_OK);
    }
}
