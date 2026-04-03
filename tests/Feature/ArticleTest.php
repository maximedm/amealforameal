<?php

use App\Models\Article;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('public news index shows published articles', function () {
    Article::factory()->count(3)->create();

    $this->get('/news')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('public/news/index')
            ->has('articles.data', 3)
        );
});

test('public news index hides draft articles', function () {
    Article::factory()->create();
    Article::factory()->draft()->create();

    $this->get('/news')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('articles.data', 1)
        );
});

test('public news show returns published article', function () {
    $article = Article::factory()->create(['slug' => 'test-article']);

    $this->get('/news/test-article')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('public/news/show')
            ->has('article')
        );
});

test('public news show returns 404 for draft', function () {
    $article = Article::factory()->draft()->create(['slug' => 'draft-article']);

    $this->get('/news/draft-article')->assertNotFound();
});

test('blog redirects to news', function () {
    $this->get('/blog')->assertRedirect('/news');
});

test('unauthenticated user cannot access admin articles', function () {
    $this->get('/articles')->assertRedirect('/login');
    $this->get('/articles/create')->assertRedirect('/login');
});

test('authenticated user can view admin article list', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/articles')
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('articles/index'));
});

test('authenticated user can create an article', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/articles', [
            'title' => 'Test Article',
            'body' => '<p>Test body content</p>',
            'category' => 'Blog',
            'published_at' => now()->toDateTimeString(),
        ])
        ->assertRedirect('/articles');

    $this->assertDatabaseHas('articles', [
        'title' => 'Test Article',
        'user_id' => $user->id,
    ]);
});

test('slug is auto-generated when not provided', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/articles', [
            'title' => 'My Amazing Article',
            'body' => '<p>Content</p>',
        ]);

    $this->assertDatabaseHas('articles', [
        'slug' => 'my-amazing-article',
    ]);
});

test('authenticated user can update an article', function () {
    $user = User::factory()->create();
    $article = Article::factory()->recycle($user)->create();

    $this->actingAs($user)
        ->put("/articles/{$article->slug}", [
            'title' => 'Updated Title',
            'body' => '<p>Updated body</p>',
        ])
        ->assertRedirect('/articles');

    $this->assertDatabaseHas('articles', [
        'id' => $article->id,
        'title' => 'Updated Title',
    ]);
});

test('authenticated user can delete an article', function () {
    $user = User::factory()->create();
    $article = Article::factory()->recycle($user)->create();

    $this->actingAs($user)
        ->delete("/articles/{$article->slug}")
        ->assertRedirect('/articles');

    $this->assertDatabaseMissing('articles', ['id' => $article->id]);
});

test('validation errors returned for invalid article', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/articles', [
            'title' => '',
            'body' => '',
        ])
        ->assertSessionHasErrors(['title', 'body']);
});
