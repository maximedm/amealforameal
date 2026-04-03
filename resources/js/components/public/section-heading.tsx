export default function SectionHeading({
    title,
    subtitle,
    light = false,
    className = '',
}: {
    title: string;
    subtitle?: string;
    light?: boolean;
    className?: string;
}) {
    return (
        <div className={`text-center ${className}`}>
            <h2
                className={`font-heading text-2xl font-bold uppercase tracking-wider md:text-3xl ${
                    light ? 'text-white' : 'text-brand-text'
                }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p
                    className={`mt-2 text-lg ${
                        light ? 'text-white/80' : 'text-brand-gray'
                    }`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}
