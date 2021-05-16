<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\PropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PropertyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Property::class, 'property');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role >= 1) {
            return Property::paginate(15); //* Returns all in DB
        } else {
            return ($user->account_type === 0) 
            //* Theoretically all landlords should have a property! but what if one doesn't? so optional used below
            ? Property::where('landlord_id', optional($user->landlord)->id)->paginate(15) 
            : response(null, Response::HTTP_FORBIDDEN);
        }  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PropertyRequest $request)
    {
        $data = $request->validated();

        $property = new Property([
            'street' => $$data['street'],
            'city' => $$data['city'],
            'state' => $$data['state'],
            'postal_code' => $$data['postal_code'],
            'additional_info' => $$data['additional_info'],
            'landlord_id' => $data['landlord_id'], //* One set, it stays
        ]);

        $property->save() ? response($property, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function show(Property $property)
    {
        return response()->json($property, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function update(PropertyRequest $request, Property $property)
    {
        $data = $request->validated();

        $propertyDataArr = $property->toArray();

        $onlyUpdateSome = array_diff($data, $propertyDataArr);

        $finalData = [
            //* Maybe a mistake is made?
            'street' => $onlyUpdateSome['street'] ?? $propertyDataArr['street'],
            'city' => $onlyUpdateSome['city'] ?? $propertyDataArr['city'],
            'state' => $onlyUpdateSome['state'] ?? $propertyDataArr['state'],
            'postal_code' => $onlyUpdateSome['postal_code'] ?? $propertyDataArr['postal_code'],
            'additional_info' => $onlyUpdateSome['additional_info'] ?? $propertyDataArr['additional_info'],
            'landlord_id' => $propertyDataArr['landlord_id'], //* Once set, it stays
        ];

        return $property->update($finalData) ? response($property, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function destroy(Property $property)
    {
        $property->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
