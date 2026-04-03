import { Link } from '@inertiajs/react';

const sdgGoals = [
    { number: 1, label: 'No Poverty', image: '/images/sdg/goal-1.webp' },
    { number: 2, label: 'Zero Hunger', image: '/images/sdg/goal-2.webp' },
    {
        number: 4,
        label: 'Quality Education',
        image: '/images/sdg/goal-4.webp',
    },
    { number: 5, label: 'Gender Equality', image: '/images/sdg/goal-5.webp' },
    {
        number: 10,
        label: 'Reduced Inequalities',
        image: '/images/sdg/goal-10.webp',
    },
    {
        number: 17,
        label: 'Partnerships for the Goals',
        image: '/images/sdg/goal-17.webp',
    },
];

export default function SdgIcons({
    linkToGoals = true,
    className = '',
}: {
    linkToGoals?: boolean;
    className?: string;
}) {
    const content = (
        <div
            className={`flex flex-wrap items-center justify-center gap-4 ${className}`}
        >
            {sdgGoals.map((goal) => (
                <img
                    key={goal.number}
                    src={goal.image}
                    alt={`SDG ${goal.number}: ${goal.label}`}
                    className="h-20 w-20 rounded-sm object-cover md:h-24 md:w-24"
                />
            ))}
        </div>
    );

    if (linkToGoals) {
        return (
            <Link href="/goals" className="block">
                {content}
            </Link>
        );
    }

    return content;
}
