import { Head } from '@inertiajs/react';
import ArticleForm from '@/components/article-form';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string;
    featured_image: string | null;
    category: string | null;
    tags: string[] | null;
    published_at: string | null;
}

export default function EditArticle({ article }: { article: Article }) {
    return (
        <>
            <Head title={`Edit: ${article.title}`} />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Edit Article</h1>
                <ArticleForm
                    article={article}
                    formAction={{
                        action: `/articles/${article.id}`,
                        method: 'post',
                    }}
                />
            </div>
        </>
    );
}
