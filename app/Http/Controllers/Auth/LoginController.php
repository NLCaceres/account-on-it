<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
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
     * Attempt to login the user based on email and password. Enable "remember" feature if included in Request
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $landlord
     * @throws \Illuminate\Validation\ValidationException
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    { //? Similar to login() in AuthUsers Trait BUT this is case-insensitive for the email by default
        $this->ensureIsNotRateLimited($request);

        Log::debug('Auth trying with: ' . implode($request->only('email')));
        //? A diff way of using the Log Facade's debug() is the "logger($someStr)" Laravel static helper. There's also info() to replace Log::info()
        //? logger() could also be used as logger()->error($someStr), i.e. to access other log levels or other Log Facade methods
        if (! Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            Log::debug("Auth failed. Invalid email or password");
            RateLimiter::hit($this->throttleKey($request));

            //? Throwing this ValidationException returns a 422 Unprocessable Content Response with the following JSON:
            throw ValidationException::withMessages([ //? "{ message: auth.failed Str, errors: { email: [ also auth.failed's string ] } }"
                'email' => trans('auth.failed'), //? Grabs the string found in "resources/lang/en/auth.php"
            ]); //? Alternatively could throw an HttpResponseException or return "response(['message' => 'Invalid Credentials'], Response::HTTP_UNAUTHORIZED)"
        }

        RateLimiter::clear($this->throttleKey($request));

        $request->session()->regenerate();

        return $this->authenticated($request, auth()->user());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Http\Exceptions\ThrottleRequestsException
     */
    public function ensureIsNotRateLimited(Request $thisRequest): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey($thisRequest), 5)) { //? Max of 5 attempts with a decay of 60 seconds (5 reqs allowed per min)
            return;
        }

        event(new Lockout($thisRequest));

        $seconds = RateLimiter::availableIn($this->throttleKey($thisRequest));

        throw new ThrottleRequestsException(trans('auth.throttle', ['seconds' => $seconds, 'minutes' => ceil($seconds / 60)]));
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(Request $thisRequest): string
    {
        return Str::transliterate(Str::lower($thisRequest->input('email')).'|'.$thisRequest->ip());
    }

    /**
     * The user has been authenticated so create the login response
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user) //? Helper method called at the end of login()
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
        //? Originally this returned response was contained in a "loggedOut()" method because BEFORE I used the AuthenticatesUsers Trait
        //? which let me use "loggedOut()" explicitly for overriding the Trait's default response, an empty JSON 200 response OR "redirect('/')"
        //? BUT since I'm not using that trait anymore, it's far simpler to make this return a one liner
        return response(["message" => "Logged out"], Response::HTTP_OK); //? If used HTTP_NO_CONTENT instead of HTTP_OK, THEN the message/JSON wouldn't be sent
    }
}
