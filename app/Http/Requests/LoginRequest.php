<?php

namespace App\Http\Requests;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    //? Determines if the user making this request is authorized to do so
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string']
        ];
    }

    /** Check the user's email and password is correct, also ensuring that the user has not made too many recent attempts to login
     *  @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            //? A diff way of using Log::debug() is Laravel's static helper: "logger($someStr)"
            Log::debug("Auth failed. Invalid email or password");
            //? There's also info() to replace Log::info() OR logger() to access the other log levels or Log Facade methods

            RateLimiter::hit($this->throttleKey());

            //? Throwing this ValidationException returns a 422 Unprocessable Content Response with the following JSON:
            throw ValidationException::withMessages([ //? "{ message: auth.failed Str, errors: { email: [ also auth.failed's string ] } }"
                'email' => trans('auth.failed'), //? Grabs the string found in "resources/lang/en/auth.php"
            ]); //? Alternatively could throw an HttpResponseException or return "response(['message' => 'Invalid Credentials'], Response::HTTP_UNAUTHORIZED)"
        }

        RateLimiter::clear($this->throttleKey());
    }

    /** Ensure the given login request is not rate limited due to more than 5 attempts per minute
     *  @throws \Illuminate\Http\Exceptions\ThrottleRequestsException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) { //? Max of 5 attempts using the default decay of 60 seconds
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw new ThrottleRequestsException(trans('auth.throttle', ['seconds' => $seconds, 'minutes' => ceil($seconds / 60)]));
    }

    //* Get the rate limiting throttle key for the given request
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('email')).'|'.$this->ip());
    }
}
