import { Head, Link } from '@inertiajs/react';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string;
    featured_image: string | null;
    category: string | null;
    tags: string[] | null;
    published_at: string;
    author: { id: number; name: string };
}

interface Props {
    article: Article;
    relatedArticles: Article[];
}

export default function NewsShow({ article, relatedArticles }: Props) {
    const publishedDate = new Date(article.published_at).toLocaleDateString(
        'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' },
    );

    return (
        <>
            <Head>
                <title>{article.title}</title>
                <meta
                    name="description"
                    content={article.excerpt ?? article.title}
                />
                <meta property="og:title" content={article.title} />
                <meta
                    property="og:description"
                    content={article.excerpt ?? article.title}
                />
                {article.featured_image && (
                    <meta
                        property="og:image"
                        content={`/storage/${article.featured_image}`}
                    />
                )}
            </Head>

            {/* Hero */}
            {article.featured_image && (
                <div className="h-64 w-full md:h-96">
                    <img
                        src={`/storage/${article.featured_image}`}
                        alt={article.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}

            <article className="px-4 py-16">
                <div className="mx-auto max-w-3xl">
                    {/* Meta */}
                    <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-brand-gray">
                        {article.category && (
                            <span className="rounded-full bg-brand-gold/10 px-3 py-1 font-semibold text-brand-gold">
                                {article.category}
                            </span>
                        )}
                        <span>{publishedDate}</span>
                        <span>&middot;</span>
                        <span>By {article.author.name}</span>
                    </div>

                    {/* Title */}
                    <h1 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
                        {article.title}
                    </h1>

                    {/* Body */}
                    <div
                        className="prose prose-lg mt-8 max-w-none prose-headings:font-heading prose-headings:text-brand-text prose-a:text-brand-gold"
                        dangerouslySetInnerHTML={{ __html: article.body }}
                    />

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
                            {article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-brand-gray"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </article>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="bg-gray-50 px-4 py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-8 text-center font-heading text-2xl font-bold uppercase tracking-wider text-brand-text">
                            Related Articles
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/news/${related.slug}`}
                                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {related.featured_image && (
                                        <img
                                            src={`/storage/${related.featured_image}`}
                                            alt={related.title}
                                            loading="lazy"
                                            className="h-40 w-full object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-heading text-sm font-bold text-brand-text">
                                            {related.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-brand-gray">
                                            {new Date(
                                                related.published_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
