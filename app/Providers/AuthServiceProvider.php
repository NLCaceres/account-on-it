<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;
// use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */ //? Laravel will try and auto register them but otherwise you can manually do it here
    //? Policies at App\Policies will check for App\Models & App\MatchingModelName 
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        
        Gate::define('is-admin', function(User $user) {
            return $user->role >= 1;
        });

        // Gate::guessPolicyNamesUsing(function ($modelClass) {
        //     //? Return the name of the policy class for the given model
        //     return 'App\\Policies\\' . class_basename($modelClass) . 'Policy';
        // });
        
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            //? You can use ->view() instead of subject,etc. to pass a custom view!
            return (new MailMessage)->from("email-verification@accountonit.com", env("MAIL_FROM_NAME"))
                ->subject('Account On It: Email Verification!')
                ->line("Click the link below to verify your email address and get started!")
                ->action('Verify Email Address', $url);
        });
    }
}
