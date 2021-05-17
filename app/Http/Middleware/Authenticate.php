<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            // @params: Route Name = '/' + Route Params = 'not-found -> /not-found
            //* Redirects to Vue SPA, specifically the 404 not found view, matches Vue-Route behavior
            return route('front-end', 'not-found'); 
            // return route('login');
        }
    }
}
