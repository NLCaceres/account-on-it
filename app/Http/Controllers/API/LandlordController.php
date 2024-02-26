<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LandlordRequest;
use App\Models\Landlord;
use Illuminate\Http\Request;
use Illuminate\Http\Response; //? Helps to save time writing http_responses
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class LandlordController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Landlord::class, 'landlord');
    }

    //* Provide all landlords that the user has access to
    public function index(Request $request): LengthAwarePaginator
    {
        $user = $request->user();
        if ($user->role >= 1) { //* Role 1 = Admin and Super
            return Landlord::paginate(15);
        } else {
            return null;
            //todo: Used in a search query + hide most user info + adjust return type
            //? When implementing, query string accessed by query() method on request
            //? When implementing search use either Laravel Collection's 
            //? Only() or Except() to select keys to keep or get rid of
        }
    }

    //* Create a new Landlord and save it to the DB
    public function store(LandlordRequest $request): Response //? Laravel Requests by default trim strings and replace empty strings with null
    {
        //? Thanks to the custom Form Request 'LandlordRequest', following validation already done!
        // $data = $request->validate([
        //     'first_name' => 'required',
        //     'surname' => 'required',
        //     'email' => 'required|email'
        // ]); //? If this failed, error response auto generated!
        $validatedData = $request->validated(); //? The LandlordRequest (and any FormRequest) will ONLY keep the validated fields! Filtering any extra sent data

        // $landlord = new Landlord([
        //     'first_name' => $validatedData['first_name'],
        //     'surname' => $validatedData['surname'],
        //     'email' => $validatedData['email'],
        //     'user_id' => $request->input('user_id')
        // ]);
        $landlord = new Landlord($validatedData); //? Creating a new Landlord is as simple as passing in the attribute array
        //? EXCEPT 'user_id' is not in Landlord's $fillable prop, so it won't be filled and must be explicitly set like below!
        $landlord->user_id = $validatedData['user_id'];

        return $landlord->save() ? response($landlord, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    //* Provide a specific Landlord
    public function show(Landlord $landlord): Response
    { //* Admin gets all of the Landlord's info. Landlord needs to see all their own tenants and properties.
        //TODO: Laravel's API Resources may be able to simplify the following conditionals
        //? Calling hideSensitiveData() even once on an instance ensures future toArray() & attributesToArray() calls don't include that data 
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
        //* If user making this request is a Tenant, THEN propertyArr is just 1 property, their own
        //? json() used here sends a Illuminate\HTTP\JsonResponse (not actually a child class of Illuminate\Http\Response but mostly identical)
        //? Bonus here is Content-Type header auto set to 'application/json'. Otherwise response() helper is usable as normal
        // return response()->json(['landlord' => $landlord->attributesToArray(), 'tenants' => $tenantArr, 'properties' => $propertyArr]);
        //? The problem with json() is it auto converts everything about the eloquent models to json, so must set $hidden or $visible prop in model class
        return response(['landlord' => $landlord->attributesToArray(), 'tenants' => $tenantArr, 'properties' => $propertyArr]);
        //? So Laravel's normal response() is better (since not even a nested ternary could help because PHP deprecated them in 7.4)
    }

    //* Update the Landlord data in the Database
    public function update(LandlordRequest $request, Landlord $landlord): Response
    {
        $data = $request->safe(['first_name', 'surname', 'email']); //? Only grabs these 3 fields from the validated fields

        return $landlord->update($data) ? response($landlord, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
    }

    //* Remove the Landlord from the database
    public function destroy(Landlord $landlord): Response
    { 
        $landlord->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
