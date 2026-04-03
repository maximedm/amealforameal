import { Head, Link } from '@inertiajs/react';
import SectionHeading from '@/components/public/section-heading';

interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image: string | null;
    category: string | null;
    published_at: string;
    author: { id: number; name: string };
}

interface PaginatedArticles {
    data: Article[];
    links: { url: string | null; label: string; active: boolean }[];
}

interface Props {
    articles: PaginatedArticles;
    categories: Record<string, number>;
    popularArticles: Article[];
    tags: Record<string, number>;
}

export default function NewsIndex({
    articles,
    categories,
    popularArticles,
    tags,
}: Props) {
    return (
        <>
            <Head title="News & Updates — A Meal For A Meal">
                <meta name="description" content="Latest news, stories, and updates from A Meal For A Meal — the Romy Foods programme providing meals to children in need across Africa." />
            </Head>

            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <SectionHeading as="h1" title="News & Updates" />

                    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_280px]">
                        {/* Main Content */}
                        <div className="space-y-10">
                            {articles.data.length === 0 && (
                                <p className="py-12 text-center text-brand-gray">
                                    No articles published yet. Check back soon!
                                </p>
                            )}

                            {articles.data.map((article) => (
                                <article
                                    key={article.id}
                                    className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {article.featured_image && (
                                        <Link href={`/news/${article.slug}`}>
                                            <img
                                                src={`/storage/${article.featured_image}`}
                                                alt={article.title}
                                                loading="lazy"
                                                className="h-56 w-full object-cover"
                                            />
                                        </Link>
                                    )}
                                    <div className="p-6">
                                        <div className="mb-3 flex items-center gap-3 text-xs text-brand-gray">
                                            {article.category && (
                                                <span className="rounded-full bg-brand-gold/10 px-3 py-1 font-semibold text-brand-gold">
                                                    {article.category}
                                                </span>
                                            )}
                                            <span>
                                                {new Date(
                                                    article.published_at,
                                                ).toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    },
                                                )}
                                            </span>
                                        </div>
                                        <h2 className="font-heading text-xl font-bold text-brand-text">
                                            <Link
                                                href={`/news/${article.slug}`}
                                                className="hover:text-brand-gold"
                                            >
                                                {article.title}
                                            </Link>
                                        </h2>
                                        {article.excerpt && (
                                            <p className="mt-3 leading-relaxed text-brand-gray">
                                                {article.excerpt}
                                            </p>
                                        )}
                                        <Link
                                            href={`/news/${article.slug}`}
                                            className="mt-4 inline-block font-heading text-sm font-semibold uppercase tracking-wider text-brand-gold hover:underline"
                                        >
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </article>
                            ))}

                            {/* Pagination */}
                            {articles.links.length > 3 && (
                                <div className="flex items-center justify-center gap-2">
                                    {articles.links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url ?? ''}
                                            className={`flex h-10 min-w-10 items-center justify-center rounded-md px-3 font-heading text-sm ${
                                                link.active
                                                    ? 'bg-brand-gold font-bold text-white'
                                                    : link.url
                                                      ? 'border border-gray-200 text-brand-gray hover:border-brand-gold'
                                                      : 'pointer-events-none text-brand-gray/40'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Categories */}
                            {Object.keys(categories).length > 0 && (
                                <div>
                                    <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-brand-text">
                                        Categories
                                    </h3>
                                    <ul className="space-y-2">
                                        {Object.entries(categories).map(
                                            ([name, count]) => (
                                                <li
                                                    key={name}
                                                    className="flex items-center justify-between border-b border-gray-100 pb-2 text-sm"
                                                >
                                                    <span className="text-brand-gray">
                                                        {name}
                                                    </span>
                                                    <span className="text-xs text-brand-gray/60">
                                                        ({count})
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Popular Posts */}
                            {popularArticles.length > 0 && (
                                <div>
                                    <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-brand-text">
                                        Popular Posts
                                    </h3>
                                    <div className="space-y-4">
                                        {popularArticles.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/news/${post.slug}`}
                                                className="flex gap-3"
                                            >
                                                {post.featured_image && (
                                                    <img
                                                        src={`/storage/${post.featured_image}`}
                                                        alt={post.title}
                                                        className="h-16 w-20 shrink-0 rounded-sm object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium leading-tight text-brand-text hover:text-brand-gold">
                                                        {post.title}
                                                    </p>
                                                    <p className="mt-1 text-xs text-brand-gray">
                                                        {new Date(
                                                            post.published_at,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {Object.keys(tags).length > 0 && (
                                <div>
                                    <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-brand-text">
                                        Popular Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.keys(tags).map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-brand-gray"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}
