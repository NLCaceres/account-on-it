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
        if (Auth::user()->role < 1) { $landlord->hideSensitiveData(); }

        if (Auth::user()->role === 0 && Auth::user()->account_type === 1) {
            //* Defaulting to a negative ID, ensures empty "tenants" and "properties" arrays are sent when a Tenant without a property requests the landlord info
            $tenantPropertyID = Auth::user()->tenant->property_id ?? -1; //TODO: BUT should the "properties" array be empty?
            $landlord->load([ //? Typing the closures' $query param as any kind of Laravel Builder seems to always throw a 500 error so better to leave it untyped
                'properties' => fn ($query) => $query->where('id', $tenantPropertyID),
                'tenants' => fn ($query) => $query->where('property_id', $tenantPropertyID)
            ]); //? PHP Arrow fns inject the surrounding scope, unlike normal anon funcs that need 'use($outsideVar)' to push vars in
        }
        else { $landlord->load('properties', 'tenants'); }

        //? Suffixing response() with json() sends a Illuminate\HTTP\JsonResponse which is not a child class of Illuminate\Http\Response but mostly identical
        //? Bonus of using json() is Content-Type header auto set to 'application/json'
        //? The problem with json() is it auto converts everything about the eloquent models to json, so must set $hidden or $visible prop in model class
        return response(['landlord' => $landlord]); //? SO using response() as normal with careful eager loading is still best
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
