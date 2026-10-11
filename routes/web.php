<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\AwardController;
use App\Http\Controllers\Admin\TraitController;
use App\Http\Controllers\Admin\MessageController;

/*
|--------------------------------------------------------------------------
| Public Portfolio Routes
|--------------------------------------------------------------------------
*/
Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.home');
Route::get('/archive', [PortfolioController::class, 'archive'])->name('portfolio.archive');
Route::post('/contact', [PortfolioController::class, 'contact'])->name('portfolio.contact');

/*
|--------------------------------------------------------------------------
| Admin CMS Routes
|--------------------------------------------------------------------------
*/
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');

Route::prefix('admin')->group(function () {
    // Guest Admin Routes
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('admin.login');
        Route::post('/login', [AuthController::class, 'login'])->name('admin.login.submit');
    });

    // Authenticated Admin Routes
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');

        // Dashboard & Profile
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::post('/profile', [DashboardController::class, 'updateProfile'])->name('admin.profile.update');
        Route::post('/profile/toggle-availability', [DashboardController::class, 'toggleAvailability'])->name('admin.profile.toggle-availability');

        // Projects Management
        Route::get('/projects', [ProjectController::class, 'index'])->name('admin.projects.index');
        Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
        Route::post('/projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
        Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

        // Skills & Tech Stack Management
        Route::get('/skills', [SkillController::class, 'index'])->name('admin.skills.index');
        Route::post('/skills', [SkillController::class, 'store'])->name('admin.skills.store');
        Route::post('/skills/{skill}', [SkillController::class, 'update'])->name('admin.skills.update');
        Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('admin.skills.destroy');
        Route::post('/skills/{skill}/toggle-highlight', [SkillController::class, 'toggleHighlight'])->name('admin.skills.toggle-highlight');

        // Trainings & Experiences Management
        Route::get('/experiences', [ExperienceController::class, 'index'])->name('admin.experiences.index');
        Route::post('/experiences', [ExperienceController::class, 'store'])->name('admin.experiences.store');
        Route::post('/experiences/{experience}', [ExperienceController::class, 'update'])->name('admin.experiences.update');
        Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('admin.experiences.destroy');

        // Awards & Recognition Management
        Route::get('/awards', [AwardController::class, 'index'])->name('admin.awards.index');
        Route::post('/awards', [AwardController::class, 'storeAward'])->name('admin.awards.store');
        Route::post('/awards/photos', [AwardController::class, 'storePhoto'])->name('admin.awards.photos.store');
        Route::post('/awards/photos/{awardPhoto}', [AwardController::class, 'updatePhoto'])->name('admin.awards.photos.update');
        Route::delete('/awards/photos/{awardPhoto}', [AwardController::class, 'destroyPhoto'])->name('admin.awards.photos.destroy');
        Route::post('/awards/{award}', [AwardController::class, 'updateAward'])->name('admin.awards.update');
        Route::delete('/awards/{award}', [AwardController::class, 'destroyAward'])->name('admin.awards.destroy');

        // What I Can Do / Traits Deck Management
        Route::get('/traits', [TraitController::class, 'index'])->name('admin.traits.index');
        Route::post('/traits', [TraitController::class, 'store'])->name('admin.traits.store');
        Route::post('/traits/{trait}', [TraitController::class, 'update'])->name('admin.traits.update');
        Route::delete('/traits/{trait}', [TraitController::class, 'destroy'])->name('admin.traits.destroy');

        // Messages Management
        Route::get('/messages', [MessageController::class, 'index'])->name('admin.messages.index');
        Route::post('/messages/{message}/toggle-read', [MessageController::class, 'toggleRead'])->name('admin.messages.toggle-read');
        Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('admin.messages.destroy');
    });
});
