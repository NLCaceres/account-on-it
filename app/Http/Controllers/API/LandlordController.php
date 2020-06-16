<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LandlordRequest;
use App\Landlord;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response; //? Save time writing http_responses!

class LandlordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 1) {
            return Landlord::paginate(15);
        } else {
            //todo: Used in a search query
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //? All requests get middleware to trim and replace '' strings with null
    public function store(LandlordRequest $request)
    {
        //? Thanks to the custom Form Request 'LandlordRequest', validation already done!
        // $data = $request->validate([
        //     'first_name' => 'required',
        //     'surname' => 'required',
        //     'email' => 'required|email'
        // ]); //? If this fails, error response auto generated!

        $data = $request->validated();

        $landlord = new Landlord($data);
        //? 201 Created
        return $landlord->save() ? response($landlord, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
        //return $landlord->save() ? response($landlord, 201)->header('Content-Type', 'application/json')
        //: response(null, 404)->header('Content-Type', 'text/plain');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Landlord  $landlord
     * @return \Illuminate\Http\Response
     */
    public function show(Landlord $landlord)
    {
        $tenants = $landlord->tenants;
        //$tenants = $tenants->isEmpty() ? [] : $tenants; //? Standard Php count($arr) does NOT work! ->count() does! but this is fastest
        $properties = $landlord->properties;
        return response($landlord, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Landlord  $landlord
     * @return \Illuminate\Http\Response
     */
    public function update(LandlordRequest $request, Landlord $landlord)
    {
        $data = $request->validated();
        return $landlord->update($data) ? response($landlord, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
        //return $landlord->update($data) ? response($landlord, 204)->header('Content-Type', 'application/json')
        //: response(null, 400)->header('Content-Type', 'text/plain');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Landlord  $landlord
     * @return \Illuminate\Http\Response
     */
    public function destroy(Landlord $landlord)
    {
        $landlord->delete();

        return response(null, Response::HTTP_NO_CONTENT);
        //return response(null, 204)->header('Content-Type', 'text/plain');
    }
}
