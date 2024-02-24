<?php

namespace App\Policies;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TenantPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    { //? It seems policies should be kept simple, letting the controller to do finer-grain filtering if absolutely needed
        return $user->role > 0 || $user->account_type === 0;
    }
    //? An alternative method to ensure that a Landlord user (aka account_type = 0) ONLY has access to its own Tenants would be to
    //? Create a NestedController linked to a route like "/landlords/{id}/tenants a la "https://github.com/adamwathan/laracon2017/pull/1"
    //? It focuses on the Single Responsibility principle by expanding routes while keeping controllers slim with less logic.
    //? A possible implementation could be the following:
    //? TenantsController becomes a controller that serves only Admins. LandlordTenantsController becomes the controller that serves a Landlord its Tenants
    //? TenantsController keeps its TenantPolicy while LandlordTenantsController can decide its authorization process internally (probably as simple as "return $landlord->tenants")

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tenant  $tenant
     * @return mixed
     */
    public function view(User $user, Tenant $tenant)
    { 
        return $user->role > 0 
            || $user->id === $tenant->user_id 
            || $user->landlord->id === $tenant->landlord_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    { //* Admin role or landlord type
        return $user->role > 0 || $user->account_type === 0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tenant  $tenant
     * @return mixed
     */
    public function update(User $user, Tenant $tenant)
    { 
        return $user->role > 0 
            || $user->id === $tenant->user_id 
            || ($user->landlord->id === $tenant->landlord_id && $tenant->user_id < 1);
            //* If $tenant->user_id is 1 or greater this means there's a registered user account for it
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tenant  $tenant
     * @return mixed
     */
    public function delete(User $user, Tenant $tenant)
    {
        return $user->role > 0 //* Below means landlord can only delete unregistered tenants
            || ($user->landlord->id === $tenant->landlord_id && $tenant->user < 1);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tenant  $tenant
     * @return mixed
     */
    // public function restore(User $user, Tenant $tenant)
    // {
    //     //
    // }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Tenant  $tenant
     * @return mixed
     */
    // public function forceDelete(User $user, Tenant $tenant)
    // {
    //     //
    // }
}
