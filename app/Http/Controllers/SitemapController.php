<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $articles = Article::published()
            ->select(['slug', 'published_at', 'updated_at'])
            ->orderByDesc('published_at')
            ->get();

        $staticPages = [
            ['url' => '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['url' => '/our-story', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/projects', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['url' => '/goals', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/partners', 'priority' => '0.7', 'changefreq' => 'monthly'],
            ['url' => '/news', 'priority' => '0.9', 'changefreq' => 'daily'],
        ];

        $content = view('sitemap', [
            'staticPages' => $staticPages,
            'articles' => $articles,
        ])->render();

        return response($content, 200)
            ->header('Content-Type', 'application/xml');
    }
}
