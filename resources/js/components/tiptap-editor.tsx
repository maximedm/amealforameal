import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
} from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

export default function TiptapEditor({
    content,
    onChange,
    placeholder = 'Start writing...',
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            Underline,
            Image.configure({ inline: false }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
            }),
            Placeholder.configure({ placeholder }),
        ],
        content,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    function addLink() {
        const url = window.prompt('Enter URL');
        if (url) {
            editor!.chain().focus().setLink({ href: url }).run();
        }
    }

    function addImage() {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor!.chain().focus().setImage({ src: url }).run();
        }
    }

    return (
        <div className="rounded-md border border-input">
            <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 p-1.5">
                <Toggle
                    size="sm"
                    pressed={editor.isActive('bold')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    aria-label="Bold"
                >
                    <Bold className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('italic')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    aria-label="Italic"
                >
                    <Italic className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('underline')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    aria-label="Underline"
                >
                    <UnderlineIcon className="size-4" />
                </Toggle>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 2 })}
                    onPressedChange={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                    aria-label="Heading 2"
                >
                    <Heading2 className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('heading', { level: 3 })}
                    onPressedChange={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                    aria-label="Heading 3"
                >
                    <Heading3 className="size-4" />
                </Toggle>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    aria-label="Bullet list"
                >
                    <List className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    aria-label="Ordered list"
                >
                    <ListOrdered className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor.isActive('blockquote')}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    aria-label="Blockquote"
                >
                    <Quote className="size-4" />
                </Toggle>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Toggle
                    size="sm"
                    pressed={editor.isActive('link')}
                    onPressedChange={addLink}
                    aria-label="Insert link"
                >
                    <LinkIcon className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={addImage}
                    aria-label="Insert image"
                >
                    <ImageIcon className="size-4" />
                </Toggle>

                <Separator orientation="vertical" className="mx-1 h-6" />

                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={() =>
                        editor.chain().focus().undo().run()
                    }
                    disabled={!editor.can().undo()}
                    aria-label="Undo"
                >
                    <Undo className="size-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={false}
                    onPressedChange={() =>
                        editor.chain().focus().redo().run()
                    }
                    disabled={!editor.can().redo()}
                    aria-label="Redo"
                >
                    <Redo className="size-4" />
                </Toggle>
            </div>

            <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none p-4 focus-within:outline-none [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
            />
        </div>
    );
}
