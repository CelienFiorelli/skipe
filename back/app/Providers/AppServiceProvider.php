<?php

namespace App\Providers;

use App\Service\FCM\FcmService\FcmService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(FcmService::class, function()
        {
            return new FcmService("skipe-2ba29", "privateKey.json");
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
    }
}
