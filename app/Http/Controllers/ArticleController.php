<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    public function index(Request $request): Response
    {
        $articles = Article::query()
            ->published()
            ->with('author:id,name')
            ->latest('published_at')
            ->paginate(10);

        $categories = Article::query()
            ->published()
            ->selectRaw('category, count(*) as count')
            ->whereNotNull('category')
            ->groupBy('category')
            ->pluck('count', 'category');

        $popularArticles = Article::query()
            ->published()
            ->latest('published_at')
            ->take(3)
            ->get(['id', 'title', 'slug', 'featured_image', 'published_at']);

        $tags = Article::query()
            ->published()
            ->whereNotNull('tags')
            ->pluck('tags')
            ->flatten()
            ->countBy()
            ->sortDesc()
            ->take(12);

        return Inertia::render('public/news/index', [
            'articles' => $articles,
            'categories' => $categories,
            'popularArticles' => $popularArticles,
            'tags' => $tags,
        ]);
    }

    public function show(Article $article): Response
    {
        abort_unless($article->published_at && $article->published_at->isPast(), 404);

        $article->load('author:id,name');

        $relatedArticles = Article::query()
            ->published()
            ->where('id', '!=', $article->id)
            ->when($article->category, fn ($q) => $q->where('category', $article->category))
            ->latest('published_at')
            ->take(3)
            ->get(['id', 'title', 'slug', 'featured_image', 'excerpt', 'published_at']);

        return Inertia::render('public/news/show', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }

    public function adminIndex(Request $request): Response
    {
        $articles = Article::query()
            ->with('author:id,name')
            ->latest()
            ->paginate(15);

        return Inertia::render('articles/index', [
            'articles' => $articles,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('articles/create');
    }

    public function store(StoreArticleRequest $request): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        }

        $data['user_id'] = $request->user()->id;

        Article::create($data);

        return to_route('articles.index');
    }

    public function edit(Article $article): Response
    {
        return Inertia::render('articles/edit', [
            'article' => $article,
        ]);
    }

    public function update(UpdateArticleRequest $request, Article $article): RedirectResponse
    {
        $data = $request->validated();

        if ($request->hasFile('featured_image')) {
            if ($article->featured_image) {
                Storage::disk('public')->delete($article->featured_image);
            }

            $data['featured_image'] = $request->file('featured_image')->store('articles', 'public');
        } else {
            unset($data['featured_image']);
        }

        $article->update($data);

        return to_route('articles.index');
    }

    public function destroy(Article $article): RedirectResponse
    {
        if ($article->featured_image) {
            Storage::disk('public')->delete($article->featured_image);
        }

        $article->delete();

        return to_route('articles.index');
    }
}
