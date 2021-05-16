<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeaseRequest;
use App\Models\Lease;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LeaseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Lease::class, 'lease');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        //todo Probably should send list of landlord's property's leases
        return ($user->role > 0) ? Lease::paginate(15) : response(null, Response::HTTP_FORBIDDEN); //* Admins only!
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LeaseRequest $request)
    {
        $data = $request->validated();

        $lease = new Lease([
            'lease_start' => $data['lease_start'],
            'lease_end' => $data['lease_end'],
            'property_id' => $data['property_id'],
        ]);

        return $lease->save() ? response($lease, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Lease  $lease
     * @return \Illuminate\Http\Response
     */
    public function show(Lease $lease)
    {
        return response()->json($lease, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Lease  $lease
     * @return \Illuminate\Http\Response
     */
    public function update(LeaseRequest $request, Lease $lease)
    {
        $data = $request->validated();

        $leaseDataArr = $lease->toArray();

        $onlyUpdateSome = array_diff($data, $leaseDataArr);

        $finalData = [
            'lease_start' => $onlyUpdateSome['lease_start'] ?? $leaseDataArr['lease_start'],
            'lease_end' => $onlyUpdateSome['lease_end'] ?? $leaseDataArr['lease_end'],
            'property_id' => $leaseDataArr['property_id'],
        ];

        return $lease->update($finalData) ? response($lease, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Lease  $lease
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lease $lease)
    {
        //$lease->delete(); //* May want to keep all lease data and never allow deletes
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
