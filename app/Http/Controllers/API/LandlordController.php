<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LandlordRequest;
use App\Models\Landlord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response; //? Save time writing http_responses!

class LandlordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Landlord::class, 'landlord');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role >= 1) { //* Role 1 = Admin and Super
            return Landlord::paginate(15);
        } else {
            return null;
            //todo: Used in a search query + hide most user info
            //? When implementing, query string accessed by query() method on request
            //? When implementing search use either Laravel Collection's 
            //? Only() or Except() to select keys to keep or get rid of
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
        //? Thanks to the custom Form Request 'LandlordRequest', following validation already done!
        // $data = $request->validate([
        //     'first_name' => 'required',
        //     'surname' => 'required',
        //     'email' => 'required|email'
        // ]); //? If this failed, error response auto generated!
        $validatedData = $request->validated();

        $landlord = new Landlord([
            'first_name' => $validatedData['first_name'],
            'surname' => $validatedData['surname'],
            'email' => $validatedData['email'],
            'user_id' => $request->input('user_id') //* Since only admins can use this route, no validation needed
            //* Maybe throw an error if null user_id?
        ]);

        return $landlord->save() ? response($landlord, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Landlord  $landlord
     * @return \Illuminate\Http\Response
     */
    public function show(Landlord $landlord)
    { //* Admin gets all. Landlord needs to see all their tenants and properties.
        //? Calling makeHidden() even once on an instance'll ensure future toArray() & attributesToArray() calls don't include that data 
        if (Auth::user()->role < 1) $landlord->hideSensitiveData(); 
        $tenantArr = $landlord->tenants;
        $propertyArr = $landlord->properties;
        //? Note: Standard Php count($arr) does NOT work on Eloquent collections! ->count() does! 
        if (Auth::user()->role === 0 && Auth::user()->account_type === 1) { 
            //* Tenant user viewing their landlord probably only needs their own property and roommates
            $tenantPropertyID = Auth::user()->tenant->property_id;
            foreach ($landlord->properties as $property) {
                if ($property->id === $tenantPropertyID) {
                    $propertyArr = $property;
                    break; //* Found tenant user's property. Stop here.
                }
            }
            //? In Php arrow fns get parent scope, normally anon fns don't and need 'use($parentVar)' to push need vars in.
            //* Unlike above, have to check all of landlord's tenants for tenant user's roommates and self.
            $tenantArr = array_filter($landlord->tenants, fn($tenant) => $tenantPropertyID === $tenant->property_id);
        }
        //* If user was tenant propertyArr is just 1 property.
        //? json() used here sends a Illuminate\HTTP\JsonResponse (not actually a child class of Response but mostly identical)
        //? Bonus here is Content-Type header auto set to 'application/json'. Otherwise response() helper is usable as normal
        // return response()->json(['landlord' => $landlord->attributesToArray(), 'tenants' => $tenantArr, 'properties' => $propertyArr]);
        //? The problem with json() is it auto converts everything about the eloquent models to json, so must set $hidden or $visible prop in model class
        return response(['landlord' => $landlord->attributesToArray(), 'tenants' => $tenantArr, 'properties' => $propertyArr]);
        //? Considered using nested ternaries a la JS/TS but php evals them a bit differently so it was deprecated Php7.4
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Landlord  $landlord
     * @return \Illuminate\Http\Response
     */
    public function update(LandlordRequest $request, Landlord $landlord)
    { 
        $data = $request->validated(); //* Validates user_id too! see below 
        $landlordDataArr = $landlord->toArray();

        $onlyUpdateSome = array_diff($data, $landlordDataArr);

        //* HERE: Don't include user_id though preventing any sketchy update on it
        $finalData = [
            'first_name' => $onlyUpdateSome['first_name'] ?? $landlordDataArr['first_name'],
            'surname' => $onlyUpdateSome['surname'] ?? $landlordDataArr['surname'],
            'email' => $onlyUpdateSome['email'] ?? $landlordDataArr['email'],
        ];

        return $landlord->update($finalData) ? response($landlord, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
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
    }
}
