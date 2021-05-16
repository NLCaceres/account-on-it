<?php

namespace Tests\Helpers;

interface PoliciesTestInterface {
  public function testViewAny(); //* GET
  public function testView(); //* POST
  public function testCreate(); //* GET
  public function testUpdate(); //* PUT
  public function testDelete(); //* DELETE
}