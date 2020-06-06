<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BasicSanctumTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    //! Function must start with 'test' or will not be tested
    public function testSanctumRedirect()
    {
        $response = $this->get('/api/tenants');

        //$response->dump(); //? Returns string response in html format

        $response->assertRedirect();
    }

    public function testSanctumProperRedirect()
    {
        $response = $this->get('/api/properties');

        //$response->dumpHeaders(); //? Returns JSON obj with cache-content, date of request, location (whether to redirect or original destination), etc

        $response->assertRedirect('/login');
    }

    public function testSanctumPermissionGranted()
    {
        $response = $this->get('/api/landlords');
    }
}
