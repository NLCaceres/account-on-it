<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;

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

    // use AuthenticatesUsers; //* No Longer in by default due to Breeze option. Brought by Laravel/ui
    //* Inside it uses ThrottlesLogins trait (also brought by laravel/ui now)
    //* Default 5 login attempts per 1 minute by 
    // protected $maxAttempts = 1; // Default is 5
    // protected $decayMinutes = 2; // Default is 1

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    // protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //? Why? Guest middleware deals w/ unauthenticated users! Authenticated users never use this! Perfect!
        $this->middleware('guest')->except(['logout']);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $landlord
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        //* Mostly identical to login() in AuthUsers Trait  
        //* EXCEPT we use a case insensitive search for a user with a matching email 
        //* updating only the email part of the credentials before attempting Login
        // $this->validateLogin($request); //? All methods from AuthenticatesUsers trait are fair game!
        $this->ensureIsNotRateLimited($request);

        //? AuthUsers trait uses ThrottlesLogins trait which grabs username and IP to do so. 
        // if (method_exists($this, 'hasTooManyLoginAttempts') &&
        //     $this->hasTooManyLoginAttempts($request)) //? All traits AuthenticatesUsers use also usable!
        // {
        //     $this->fireLockoutEvent($request);

        //     return $this->sendLockoutResponse($request);
        // }

        // $credentials = $this->credentials($request);
        //* Case insensitive search
        // $user = User::firstWhere('email', 'ilike', $credentials['email']); //? Could add '%' to either side for substring search
        
        // if (! is_null($user)) $credentials['email'] = $user['email']; //* Only update email (otherwise will not be case insensitive)

        //? Normally Laravel uses the following line, but we don't quite have access to it, 
        //? So we can use Auth::guard instead, which is more or less the same
        // $loginAttempt = $this->guard()->attempt(
        //     $credentials,
        //     $request->filled('remember')
        // );

        Log::debug('Auth trying with: ' . implode($request->only('email')));
        //? A diff way of using the Log Facade's debug() is the "logger($someStr)" Laravel static helper. There's also info() to replace Log::info()
        //? logger() could also be used as logger()->error($someStr), i.e. to access other log levels or other Log Facade methods
        if (! Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            Log::debug("Auth failed. Invalid email or password");
            RateLimiter::hit($this->throttleKey($request));

            //? Throwing this ValidationException returns a 422 JSON Response of:
            throw ValidationException::withMessages([ //? "{ message: auth.failed Str, errors: { email: [ also auth.failed's string ] } }"
                'email' => trans('auth.failed'), //? Grabs the string found in "resources/lang/en/auth.php"
            ]);
        }

        RateLimiter::clear($this->throttleKey($request));

        $request->session()->regenerate();

        return $this->authenticated($request, auth()->user());
        // if (Auth::attempt($credentials, $request->filled('remember'))) { //* This section changed from AuthenticatesUsers to override
        //     return $this->sendLoginResponse($request);
        // }

        //? Login attempt unsuccessful, if over max # of attempts lock out user. Redirect from Vue if needed
        // $this->incrementLoginAttempts($request);

        //? Normally Laravel sends the following line, but instead we make our own message
        //return $this->sendFailedLoginResponse($request);
        // return response(['message' => 'Invalid Credentials'], Response::HTTP_UNAUTHORIZED);  
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(Request $thisRequest): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($thisRequest), 5)) { //? Max of 5 attempts
            return;
        }

        event(new Lockout($thisRequest));

        $seconds = RateLimiter::availableIn($this->throttleKey($thisRequest));

        //TODO: Throws a 422 Unprocessable Content request BUT maybe a different exception is more fitting
        throw ValidationException::withMessages([ //? Specifically one that throws a 429 Too Many Requests errors!
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(Request $thisRequest): string
    {
        return Str::transliterate(Str::lower($thisRequest->input('email')).'|'.$thisRequest->ip());
    }

    //* Following 2 methods are callback functions, done after logging in & logging out respectively
    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    //? This gets called from the above sendLoginResponse (only because it's a function that is set)
    protected function authenticated(Request $request, $user)
    {
        //* Getting an array w/ relations, adding in an attr in place of 'email_verified_at', and sending
        $userArray = $user->attributesToArray();

        if ($user->role === 1) {
            //* Admins should have access to everything
        } elseif ($user->account_type === 0) {
            //* Landlord only needs its ID
            $userArray['landlord_id'] = optional($user->landlord)->id;
        } else {
            //* Tenant needs its ID, property, and landlord
            $userArray['tenant_id'] = optional($user->tenant)->id;
            $userArray['property_id'] = optional($user->tenant)->property_id;
            $userArray['landlord_id'] = optional($user->tenant)->landlord_id;
        }

        $userArray['email_verified'] = $user->email_verified_at != null ?: false; //? Elvis operator similar to Kotlin's
        unset($userArray['email_verified_at']); //? Removes an elem (mutable array so no need to reset);

        return response(['message' => 'Logged in', 'user' => $userArray], Response::HTTP_OK);
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request)
    {
        //? Guard refers to the guards defined in "config/auth" BUT "web" is actually the current default
        Auth::guard('web')->logout(); //? SO prefixing with Auth::guard() is actually not needed.
        //? It could instead just be auth()->logout() OR Auth::logout() automatically assuming the default StatefulGuard

        $request->session()->invalidate();

        $request->session()->regenerateToken();
        //? Originally this returned response was contained in a "loggedOut()" method since BEFORE I used the AuthenticatesUsers Trait
        //? which let me use "loggedOut()" explicitly for overriding the Trait's default response, an empty JSON 200 response OR "redirect('/')"
        //? BUT since I'm not using that trait anymore, it's far simpler to make this return a one liner
        return response(["message" => "Logged out"], Response::HTTP_OK); //? If used HTTP_NO_CONTENT instead of HTTP_OK, THEN the message/JSON wouldn't be sent
    }
}
