export default function SectionHeading({
    title,
    subtitle,
    light = false,
    className = '',
    as: Tag = 'h2',
}: {
    title: string;
    subtitle?: string;
    light?: boolean;
    className?: string;
    as?: 'h1' | 'h2' | 'h3';
}) {
    return (
        <div className={`text-center ${className}`}>
            <Tag
                className={`font-heading text-2xl font-bold uppercase tracking-wider md:text-3xl ${
                    light ? 'text-white' : 'text-brand-text'
                }`}
            >
                {title}
            </Tag>
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
