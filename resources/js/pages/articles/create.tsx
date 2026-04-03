import { Head } from '@inertiajs/react';
import ArticleForm from '@/components/article-form';

export default function CreateArticle() {
    return (
        <>
            <Head title="New Article" />
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">New Article</h1>
                <ArticleForm
                    formAction={{
                        action: '/articles',
                        method: 'post',
                    }}
                />
            </div>
        </>
    );
}
