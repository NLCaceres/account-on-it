<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Client\Response;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\User;

class BasicAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin() //? No call to sanctum/csrf-cookie (only needed to authenticate later calls in real app)
    {
        $user = factory(\App\User::class)->create([
            'email' => 'jondoe@email.com',
            'password' => Hash::make('password'),
        ]);

        $loginResponse = $this->post('/login', [
            'email' => 'jondoe@email.com',
            'password' => 'password',
            'remember' => true,
        ]);
        $this->assertAuthenticatedAs($user);
    }

    public function testCookieReception()
    {
        $cookieResponse = $this->get('/sanctum/csrf-cookie');
        //dd($cookieResponse->headers->getCookies()[0]->getValue()); //? DD can BLOCK others!
        $cookieResponse->assertCookie('XSRF-TOKEN');
        $cookieResponse->assertNoContent();
    }

    public function testAddRememberToken()
    {
        $user = factory(\App\User::class)->create([
            'email' => 'jondoe@email.com',
            'password' => Hash::make('password'),
            'remember_token' => null
        ]);

        $loginResponse = $this->post('/login', [
            'email' => 'jondoe@email.com',
            'password' => 'password',
            'remember' => true,
        ]);

        $userArr = $user->toArray();

        $updatedUser = User::firstWhere('email', 'jondoe@email.com')->toArray();

        $this->assertTrue($userArr['remember_token'] != $updatedUser['remember_token']);
    }
}
