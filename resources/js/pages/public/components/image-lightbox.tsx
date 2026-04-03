import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageLightboxProps {
    images: { src: string; alt: string }[];
    initialIndex: number;
    onClose: () => void;
}

export default function ImageLightbox({
    images,
    initialIndex,
    onClose,
}: ImageLightboxProps) {
    const [index, setIndex] = useState(initialIndex);

    const prev = useCallback(
        () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)),
        [images.length],
    );

    const next = useCallback(
        () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
        [images.length],
    );

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }

        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
            >
                <X className="size-6" />
            </button>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    prev();
                }}
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Previous image"
            >
                <ChevronLeft className="size-6" />
            </button>

            <img
                src={images[index].src}
                alt={images[index].alt}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    next();
                }}
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                aria-label="Next image"
            >
                <ChevronRight className="size-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60">
                {index + 1} / {images.length}
            </div>
        </div>
    );
}
