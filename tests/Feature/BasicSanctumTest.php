<?php

namespace Tests\Feature;

use App\Models\User;
use Laravel\Sanctum\Sanctum;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BasicSanctumTest extends TestCase
{
    //? Laravel interestingly uses snake_case for its tests 
    //? BUT php artisan make:test by default uses camelCase... so up to the dev probably
    /**
     * A basic test example.
     *
     * @return void
     */
    //! Function must start with 'test' or will not be tested
    public function testSanctumProperRedirect()
    {
        $response = $this->get('/api/properties'); //* Without Accept: 'application/json', sanctum redirects out

        //$response->dump(); //? Returns JSON obj with cache-content, date of request, location (whether to redirect or original destination), etc

        //* Another way saying status code 302 sent
        $response->assertRedirect('/not-found'); //* Redirect URL set up in app\Http\Middleware\Authenticate.php

        //* 2nd param here is useful for API Tokens, so maybe for a mobile app API (not much useful for a SPA)
        Sanctum::actingAs(User::factory()->landlords()->create());

        $responseAuthd = $this->get('/api/properties'); //* Dump() = typical paginated data response for auth'd users
        $responseAuthd->assertOk(); //* When properly auth'd status 200 response with data 

    }

    public function testSanctumPermissionGranted()
    {
        $this->assertGuest();
        //* Without the accept header, 302 redirect is sent so user goes to /not-found page
        $response = $this->withHeaders(["Accept" => "application/json"])->get('/api/landlords');
        $response->assertUnauthorized();

        //* A bit indicative of policies but as long as above keeps out unauth'd users
        Sanctum::actingAs(User::factory()->landlords()->create());
        $authdResponse = $this->withHeaders(["Accept" => "application/json"])->get('/api/landlords');
        $authdResponse->assertForbidden();

        Sanctum::actingAs(User::factory()->admins()->create());
        $authdAdminResponse = $this->withHeaders(['Accept'=>'application/json'])->get('/api/landlords');
        $authdAdminResponse->assertOk();
    }
}
