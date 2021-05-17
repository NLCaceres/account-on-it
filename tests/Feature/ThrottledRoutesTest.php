<?php

namespace Tests\Feature;

use Illuminate\Auth\SessionGuard; //* Logs out user

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ThrottledRoutesTest extends TestCase
{
    //? Auth Setup
    protected function resetAuth(array $guards = null) : void
    {
        $guards = $guards ?: array_keys(config('auth.guards'));

        foreach ($guards as $guard) {
            $guard = $this->app['auth']->guard($guard);

            if ($guard instanceof SessionGuard) {
                $guard->logout();
            }
        }

        $protectedProperty = new \ReflectionProperty($this->app['auth'], 'guards');
        $protectedProperty->setAccessible(true);
        $protectedProperty->setValue($this->app['auth'], []);
    }
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegistrationThrottle()
    { //? Alternatively can check qualities of the route (such as middleware) (though not really testing that we get throttled!) 
        //? with assertContains, 'throttle:name' & Route::getRoutes()->getByName ->gatherMiddleware()
        $user = ['email'=>'foobar@example.com', 'password'=>'foobar123', 'password_confirmation'=>'foobar124', 
        'first_name'=>'Foo', 'surname' => 'Bar', 'account_type'=> 0];

        // foreach(range(0,4) as $attempt) //? Bit more php way of doing it. Range returns array of size 5 (0=>0,1=>1, etc)
        for ($x = 0; $x < 5; $x++) { //* Fire off 5 requests
            $response = $this->withHeaders(["Accept" => "application/json"])->post('/api/register', $user);
            $response->assertStatus(422);
        }
        //* 6th request should be throttled
        $response = $this->withHeaders(["Accept" => "application/json"])
            ->post('/api/register', $user);

        $response->assertStatus(429); //* and fire off this status code
    }
}
