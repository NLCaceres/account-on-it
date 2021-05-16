<?php

namespace Tests\Feature\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Tests\Helpers\ApiControllerTestTrait;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;
    use ApiControllerTestTrait;

    protected function baseURL() { return $this->URL_PREFIX . 'users'; } //* /api/users

    /**
     * A basic feature test example.
     *
     * @return void
     */
    //* Pattern for first 2 = api/models
    public function testIndex()
    {
        $normalResponse = $this->makeRequest(User::factory()->landlords()->create());
        $normalResponse->assertForbidden();

        $adminResponse = $this->makeRequest(User::factory()->admins()->create());
        $adminResponse->assertOk();
    }

    public function testStore() //* Auth'd = 200 OK, Not = 403 Forbidden, ERR = 403
    {
        $defaultUserState = ['email_verified_at' => null, 'remember_token' => null,
        'password' => 'foobar123', 'password_confirmation' => 'foobar123'];
        $normalResponse = $this->makeRequest(User::factory()->landlords()->create(), null, 1, User::factory()->landlords()->raw($defaultUserState));
        $normalResponse->assertForbidden();

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), null, 1, User::factory()->landlords()->raw($defaultUserState));
        $adminResponse->assertCreated();
    }

    //* Pattern of last 3 = api/models/{model}
    public function testShow() //* Auth'd = 200 OK, Not = 403 Forbidden
    {
        //* Since refreshDatabase resets tables each test, primary_key ids keep rising but rows disappear
        //* Have to play a bit of a guessing game so maybe best without it for some controllers
        $userIDtoShow = 4;
        $normalResponse = $this->makeRequest(User::factory()->landlords()->create(), $userIDtoShow);
        $normalResponse->assertForbidden();

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $userIDtoShow);
        $adminResponse->assertOk();
    }

    public function testUpdate() //* Not authorized = 403 Forbidden, Err = 400 BadRequest Auth'd = 204 NoContent
    { //* Pattern: Admins can. User can update self only
        $newUser = User::factory()->landlords()->create(['password' => Hash::make('foobar123')]);
        $userNewState = ['first_name' => 'foo', 'surname' => 'bar', 'email' => 'newEmail@example.com',
            'password' => 'foobar123', 'password_confirmation' => 'foobar123', 'account_type' => 1, 'role' => 1];

        $userUpdatingRandomUserResponse = $this->makeRequest(User::factory()->landlords()->create(), $newUser->id, 2, $userNewState);
        $userUpdatingRandomUserResponse->assertForbidden();

        $userUpdatingSelfResponse = $this->makeRequest($newUser, $newUser->id, 2, $userNewState);
        $userUpdatingSelfResponse->assertNoContent();

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $newUser->id, 2, $userNewState);
        $adminResponse->assertNoContent();
    }

    public function testDestroy() //* Authorized to delete = 204 NoContent 
    { //* Pattern: Admins can. User can update self only
        $userToDelete = User::factory()->landlords()->create();

        $normalResponse = $this->makeRequest(User::factory()->landlords()->create(), $userToDelete->id, 3);
        $normalResponse->assertForbidden();

        $adminResponse = $this->makeRequest(User::factory()->admins()->create(), $userToDelete->id, 3);
        $adminResponse->assertNoContent();
    }
}
