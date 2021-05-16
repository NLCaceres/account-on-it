<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */ //? Index
    public function viewAny(User $user)
    {
        return $user->role > 0;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */ //? Show
    public function view(User $user, User $model)
    {
        return $user->id === $model->id || $user->role > 0;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */ //? Store
    public function create(User $user)
    {
        return $user->role > 0;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */ //? Update
    public function update(User $user, User $model)
    {
        return $user->id === $model->id || $user->role > 0;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */ //? Destroy 
    public function delete(User $user, User $model)
    {
        return $user->id === $model->id || $user->role > 0;
    }

    //? Following only necessary if 'use SoftDeletes;' on a model file
    //? Also important to include '$table->softDeletes();' in migration file (adds 'deleted_at' column)
    //* These may be worth considering for tenants that leave but come back
    //* A returning landlord may be a different story/pathway
    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    // public function restore(User $user, User $model)
    // {
    //     //
    // }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    // public function forceDelete(User $user, User $model)
    // {
    //     //
    // }
}
