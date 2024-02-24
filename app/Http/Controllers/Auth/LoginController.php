<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//* This controller handles authentication across the app, granting users one of three roles: Admin, Landlord, or Tenant
//* Returns error messaging if invalid credentials received or if the user has made too many invalid attempts recently
class LoginController extends Controller
{
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

    /** Attempt to login the user based on email and password. Enable "remember" feature if included in Request
     * @param  \App\Http\Requests\LoginRequest $request
     * @return \Illuminate\Http\Response - From authenticated()
     */
    public function login(LoginRequest $request): Response
    { //? Similar to login() in AuthUsers Trait BUT this is case-insensitive for the email by default
        $request->authenticate();

        $request->session()->regenerate();

        return $this->authenticated();
    }

    //* The user has been authenticated so grab the user and create the login response
    protected function authenticated(): Response
    {
        /** @var \App\Models\User $user */ //? PHPDoc helps for casting returned interfaces to their concrete implementations
        $user = auth()->user(); //? Otherwise, PHP generally only allows type casting primitives (called type juggling by PHP)

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

    //* Destroy a User's authenticated session
    public function logout(Request $request): Response
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
