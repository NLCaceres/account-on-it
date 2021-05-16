<?php

namespace Tests\Helpers;

use Laravel\Sanctum\Sanctum;

//* Sets the standard for what a Controller Test tests (all 5 routes)
//* As well as provides a helper function to run requests quickly and easily

//* Originally considered an interface but Traits allow for much better DRY programming in this case
trait ApiControllerTestTrait {
    //? Php Traits don't allow constants BUT trait properties can't be redefined/overriden ERGO effectively constants
    //? (Admittedly not entirely sure if this means they can't be mutated though)
    private $ACCEPT_JSON_HEADER = ["Accept" => "application/json"];
    protected $URL_PREFIX = '/api/';

    protected function makeRequest($userMakingRequest, $id = '', $requestType = 0, $data = null) //* Request = 0 - get, 1 - post, 2 - put, 3 - delete
    {
        Sanctum::actingAs($userMakingRequest);
        $fullUrl = $this->baseURL() . "/$id";
        //? Php allows "This is $varName" all with the same performance (using "") but below it likely won't catch the var without {}
        if ($requestType === 1) { //* POST - Store 
            return $this->post($fullUrl, $data, $this->ACCEPT_JSON_HEADER);
        } elseif ($requestType === 2) { //* PUT - Update
            return $this->put($fullUrl, $data, $this->ACCEPT_JSON_HEADER);
        } elseif ($requestType === 3) { //* DELETE 
            return $this->delete($fullUrl, [], $this->ACCEPT_JSON_HEADER);
        } else { //* GET - Index, Show
            return $this->get($fullUrl, $this->ACCEPT_JSON_HEADER);
        }
    }

    abstract protected function baseURL(); //* Allows trait using class to set base URL property with a getter in a nice one-liner and be used here!

    abstract protected function testIndex(); //* GET
    abstract protected function testStore(); //* POST
    abstract protected function testShow(); //* GET
    abstract protected function testUpdate(); //* PUT
    abstract protected function testDestroy(); //* DELETE
}