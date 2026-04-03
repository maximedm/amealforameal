<?php

use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Route;

// Public pages
Route::inertia('/', 'public/home')->name('home');
Route::inertia('/our-story', 'public/our-story')->name('our-story');
Route::inertia('/projects', 'public/projects')->name('projects');
Route::inertia('/partners', 'public/partners')->name('partners');
Route::inertia('/goals', 'public/goals')->name('goals');

// Public news
Route::get('/news', [ArticleController::class, 'index'])->name('news.index');
Route::get('/news/{article}', [ArticleController::class, 'show'])->name('news.show');
Route::redirect('/blog', '/news', 301);

// Authenticated
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Admin article management
    Route::get('articles', [ArticleController::class, 'adminIndex'])->name('articles.index');
    Route::resource('articles', ArticleController::class)->except(['index', 'show']);
});

require __DIR__.'/settings.php';
