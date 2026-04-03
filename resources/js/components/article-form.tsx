import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import TiptapEditor from '@/components/tiptap-editor';

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

interface ArticleFormProps {
    article?: Article;
    formAction: { action: string; method: string };
}

export default function ArticleForm({ article, formAction }: ArticleFormProps) {
    const [body, setBody] = useState(article?.body ?? '');
    const [imagePreview, setImagePreview] = useState<string | null>(
        article?.featured_image
            ? `/storage/${article.featured_image}`
            : null,
    );

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const publishedLocal = article?.published_at
        ? new Date(article.published_at).toISOString().slice(0, 16)
        : '';

    return (
        <Form
            {...formAction}
            encType="multipart/form-data"
            options={{ preserveScroll: true, forceFormData: true }}
            className="space-y-6"
        >
            {({ processing, errors }) => (
                <>
                    <input type="hidden" name="body" value={body} />

                    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    defaultValue={article?.title ?? ''}
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div>
                                <Label htmlFor="slug">
                                    Slug{' '}
                                    <span className="text-muted-foreground">
                                        (auto-generated if empty)
                                    </span>
                                </Label>
                                <Input
                                    id="slug"
                                    name="slug"
                                    defaultValue={article?.slug ?? ''}
                                />
                                <InputError message={errors.slug} />
                            </div>

                            <div>
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    name="excerpt"
                                    defaultValue={article?.excerpt ?? ''}
                                    rows={3}
                                />
                                <InputError message={errors.excerpt} />
                            </div>

                            <div>
                                <Label>Body</Label>
                                <TiptapEditor
                                    content={body}
                                    onChange={setBody}
                                    placeholder="Write your article..."
                                />
                                <InputError message={errors.body} />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="featured_image">
                                    Featured Image
                                </Label>
                                <Input
                                    id="featured_image"
                                    name="featured_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 h-40 w-full rounded-md object-cover"
                                    />
                                )}
                                <InputError message={errors.featured_image} />
                            </div>

                            <div>
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    name="category"
                                    defaultValue={article?.category ?? ''}
                                    placeholder="e.g. Blog, Education, Health"
                                />
                                <InputError message={errors.category} />
                            </div>

                            <div>
                                <Label htmlFor="tags">
                                    Tags{' '}
                                    <span className="text-muted-foreground">
                                        (comma separated)
                                    </span>
                                </Label>
                                <Input
                                    id="tags_input"
                                    defaultValue={
                                        article?.tags?.join(', ') ?? ''
                                    }
                                    placeholder="Africa, Education, Uganda"
                                    onChange={(e) => {
                                        const hidden =
                                            e.target.parentElement?.querySelectorAll(
                                                'input[name="tags[]"]',
                                            );
                                        hidden?.forEach((el) => el.remove());

                                        e.target.value
                                            .split(',')
                                            .map((t) => t.trim())
                                            .filter(Boolean)
                                            .forEach((tag) => {
                                                const input =
                                                    document.createElement(
                                                        'input',
                                                    );
                                                input.type = 'hidden';
                                                input.name = 'tags[]';
                                                input.value = tag;
                                                e.target.parentElement?.appendChild(
                                                    input,
                                                );
                                            });
                                    }}
                                />
                                {(article?.tags ?? []).map((tag, i) => (
                                    <input
                                        key={i}
                                        type="hidden"
                                        name="tags[]"
                                        defaultValue={tag}
                                    />
                                ))}
                                <InputError message={errors.tags} />
                            </div>

                            <div>
                                <Label htmlFor="published_at">
                                    Publish Date{' '}
                                    <span className="text-muted-foreground">
                                        (leave empty for draft)
                                    </span>
                                </Label>
                                <Input
                                    id="published_at"
                                    name="published_at"
                                    type="datetime-local"
                                    defaultValue={publishedLocal}
                                />
                                <InputError message={errors.published_at} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {article ? 'Update Article' : 'Create Article'}
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
