<?php

namespace App\Policies;

use App\Models\Landlord;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LandlordPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //* If landlord_id, property_id, & lease_id > 0 then tenant is likely a SEARCHING tenant
        return $user->role > 0 
            || ($user->tenant->landlord_id > 0 
                && $user->tenant->property_id > 0 
                && $user->tenant->lease_id > 0);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Landlord  $landlord
     * @return mixed
     */
    public function view(User $user, Landlord $landlord)
    {
        return $user->id === $landlord->user_id 
            || $user->role > 0 
            || $user->tenant->landlord_id === $landlord->id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role > 0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Landlord  $landlord
     * @return mixed
     */
    public function update(User $user, Landlord $landlord)
    {
        return $user->role > 0 || $user->id === $landlord->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Landlord  $landlord
     * @return mixed
     */
    public function delete(User $user, Landlord $landlord)
    {
        return $user->role > 0;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Landlord  $landlord
     * @return mixed
     */
    // public function restore(User $user, Landlord $landlord)
    // {
    //     //
    // }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Landlord  $landlord
     * @return mixed
     */
    // public function forceDelete(User $user, Landlord $landlord)
    // {
    //     //
    // }
}
