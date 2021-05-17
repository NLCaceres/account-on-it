<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        unset($data['role']); //* Don't allow anyone to try and set it //? Though if it does, it should cause a 422 unprocessable entity
        return Validator::make($data, [
            'first_name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            //? Could do 'use Illuminate\Validation\Rule; Rule::in([...values])' instead of comma delim'd string
            'account_type' => ['required', 'integer', 'numeric', 'in:0,1'], //? Integer is handled by PHP filter, numeric by laravel's
            //'role' => ['required', 'integer', 'numeric', 'min:0', 'max:1'] //? Should never come through! Unless super specially and carefully handled 
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        //? Postgre should handle unique values 
        //? Case insensitive -> jonsmith@email.com & JonSmith@email.com throw off duplicate key error!
        return User::create([
            'first_name' => $data['first_name'],
            'surname' => $data['surname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'account_type' => $data['account_type'],
            'role' => 0 //* If registering through api as expected, everyone gets normal user - No chance to make themselves an admin
            //todo Check if landlord or tenant account and create that data point as well
        ]);
    }

    protected function registered(Request $request, $user) 
    {
        $userData = [
            'first_name' => $user['first_name'],
            'surname' => $user['surname'],
            'email' => $user['email'],   
        ];
        if ($user->account_type === 0) {
            $user->landlord()->create($userData);
        } else {
            $user->tenant()->create([$userData]);
        }
        return new JsonResponse(["message" => "User Registered!"], Response::HTTP_CREATED);
    }

    //* Register func that RegistersUsers trait uses
    // protected function register(Request $request) 
    // {
    //     $this->validator($request->all())->validate();

    //     //? Following line fires off SendEmail in app/Providers/EventServiceProvider.php
    //     event(new Registered($user = $this->create($request->all())));

    //     $this->guard()->login($user);

    //     if ($response = $this->registered($request, $user)) {
    //         return $response;
    //     }

    //     return $request->wantsJson() ? new JsonResponse([], 201) : redirect($this->redirectPath());
    // }
}
