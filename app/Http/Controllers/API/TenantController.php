<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\TenantRequest;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TenantController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
        $this->authorizeResource(Tenant::class, 'tenant');
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
            return Tenant::paginate(15);
        } else {
            return ($user->account_type === 0) ? Tenant::where('landlord_id', $user->landlord->id)->paginate(15)
            : response(null, 403);
        }     
        return Tenant::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TenantRequest $request)
    {
        $data = $request->validated();

        $tenant = new Tenant([
            'first_name' => $data['first_name'],
            'surname' => $data['surname'],
            'email' => $data['email'],
            'lease_id' => $data['lease_id'] ?? null, //* May need to create one here
            //* Following could all be null if tenant is searching
            'landlord_id' => $data['landlord_id'] ?? null,
            'property_id' => $data['property_id'] ?? null,
            'user_id' => $data['user_id'] ?? null
        ]);

        return $tenant->save() ? response($tenant, Response::HTTP_CREATED) : response(null, Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Tenant $tenant)
    {
        $tenantData = array("tenant" => $tenant->attributesToArray(), "payments" => $tenant->payments, 
            "property" => $tenant->property, "lease" => $tenant->lease, "landlord" => $tenant->landlord);
        $user = $request->user();
        if ($user->role === 1) $tenantData["user"] = $tenant->user;
        return response($tenantData, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function update(TenantRequest $request, Tenant $tenant)
    {
        $data = $request->validated();
        $tenantDataArr = $tenant->toArray();

        $onlyUpdateSome = array_diff($data, $tenantDataArr);

        $finalData = [
            'first_name' => $onlyUpdateSome['first_name'] ?? $tenantDataArr['first_name'],
            'surname' => $onlyUpdateSome['surname'] ?? $tenantDataArr['surname'],
            'email' => $onlyUpdateSome['email'] ?? $tenantDataArr['email'],
        ];
        return $tenant->update($finalData) ? response($tenant, Response::HTTP_NO_CONTENT) : response(null, Response::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tenant  $tenant
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tenant $tenant)
    {
        $tenant->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
