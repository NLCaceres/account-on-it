<?php

namespace App\Policies;

use App\Models\Lease;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LeasePolicy
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
        return $user->role > 0;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Lease  $lease
     * @return mixed
     */
    public function view(User $user, Lease $lease)
    {
        return $user->role > 0;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role > 0 || $user->account_type === 0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Lease  $lease
     * @return mixed
     */
    public function update(User $user, Lease $lease)
    {
        //todo placeholder false for checking if user is landlord with property that has this lease
        return $user->role > 0 || false;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Lease  $lease
     * @return mixed
     */
    public function delete(User $user, Lease $lease)
    {
        //todo placeholder false for checking if user is landlord with property that has this lease
        return $user->role > 0 || false;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Lease  $lease
     * @return mixed
     */
    // public function restore(User $user, Lease $lease)
    // {
    //     //
    // }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Lease  $lease
     * @return mixed
     */
    // public function forceDelete(User $user, Lease $lease)
    // {
    //     //
    // }
}
