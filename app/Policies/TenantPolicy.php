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
    { //* Maybe help landlords find tenants?
        return $user->role > 0;
    }

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
