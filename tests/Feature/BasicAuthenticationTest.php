<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Client\Response;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;

class BasicAuthenticationTest extends TestCase
{
    use RefreshDatabase; //* Makes sure we have a fresh database

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin() //? No call to sanctum/csrf-cookie needed (but POSTMAN may need to or grab cookie from response html)
    {
        $user = User::factory()->create([
            'email' => 'jondoe@email.com',
            'password' => Hash::make('password'),
        ]);

        $loginResponse = $this->post('/api/login', [
            'email' => 'jondoe@email.com',
            'password' => 'password',
            'remember' => true,
        ]);

        $loginResponse->assertOk();
        $this->assertAuthenticatedAs($user);
    }

    public function testSetSanctumXsrfToken()
    {
        $cookieResponse = $this->get('/sanctum/csrf-cookie');
        //dd($cookieResponse->headers->getCookies()[0]->getValue()); //? DD can BLOCK other debugging messages!
        $cookieResponse->assertCookie('XSRF-TOKEN');
        $cookieResponse->assertNoContent();
    }

    public function testSetRememberToken()
    {
        $user = User::factory()->create([
            'email' => 'jondoe@email.com',
            'password' => Hash::make('password'),
            'remember_token' => null
        ]);

        $loginResponse = $this->post('/api/login', [
            'email' => 'jondoe@email.com',
            'password' => 'password',
            'remember' => true,
        ]);

        $userArr = $user->toArray(); $userArr['remember_token'] = null;

        $userSearch = User::firstWhere('email', 'jondoe@email.com');
        $updatedUser = $userSearch->makeVisible("remember_token");

        //* Since above factory sets remember_token = null, php doesn't return it in array
        $this->assertTrue($updatedUser['remember_token'] != $userArr['remember_token']);
    }
}
