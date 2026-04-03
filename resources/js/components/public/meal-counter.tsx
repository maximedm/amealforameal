import { useEffect, useRef, useState } from 'react';

export default function MealCounter({
    target = 2551776,
    duration = 1200,
    className = '',
}: {
    target?: number;
    duration?: number;
    className?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    animate();
                }
            },
            { threshold: 0.3 },
        );

        observer.observe(element);
        return () => observer.disconnect();

        function animate() {
            const start = performance.now();
            const from = Math.floor(target * 0.85);

            function step(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(from + eased * (target - from)));

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    setCount(target);
                }
            }

            requestAnimationFrame(step);
        }
    }, [target, duration]);

    const formatted = count.toLocaleString('en-US').replace(/,/g, ' ');

    return (
        <div ref={ref} className={className} aria-live="polite" aria-atomic="true">
            <span className="font-heading text-5xl font-bold text-brand-gold md:text-6xl">
                {formatted}
            </span>
        </div>
    );
}
