import { Head } from '@inertiajs/react';
import SdgIcons from '@/components/public/sdg-icons';
import SectionHeading from '@/components/public/section-heading';

const goals = [
    {
        number: 1,
        title: 'No Poverty',
        description:
            'A free daily school meal directly impacts the chances of present and future generations to get out of the poverty cycle.',
    },
    {
        number: 2,
        title: 'Zero Hunger',
        description:
            'By allowing the poorest children to have a steady meal every school day, we can ensure they have their most basic needs met.',
    },
    {
        number: 4,
        title: 'Quality Education',
        description:
            "Being able to study when suffering from hunger is a challenge. The quality of the education is not only based on the teacher's competence or the access to books, pens and paper, but in the children's ability to take in, process and absorb what they are taught. Our school meals are contributing towards quality education as a free meal every day is a vital part for them to be able to learn.",
    },
    {
        number: 5,
        title: 'Gender Equality',
        description:
            'We have learnt that female attendance rates have been low due to other priorities within poor families such as household chores like fetching water from far away. A robust warm meal available every day in school, has contributed to increased female attendance rates.',
    },
    {
        number: 10,
        title: 'Reduced Inequalities',
        description:
            'Basic primary school education is necessary to be able to grow and compete on equal conditions. A Meal for A Meal is providing support towards a good start in life for those who need it the most, which reduces the gap between them and privileged children in the industrialised world.',
    },
    {
        number: 17,
        title: 'Partnership for the Goals',
        description:
            'The partnership between Romy Foods and NGOs in relation to A Meal for A Meal programme is a perfect example of a partnership contributing towards the SDGs.',
    },
];

export default function Goals() {
    return (
        <>
            <Head title="UN Sustainable Development Goals — A Meal For A Meal">
                <meta name="description" content="A Meal For A Meal contributes to six UN Sustainable Development Goals: No Poverty, Zero Hunger, Quality Education, Gender Equality, Reduced Inequalities, and Partnership for the Goals." />
            </Head>

            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading as="h1" title="United Nations Sustainable Development Goals" />

                    <div className="mt-8 overflow-hidden rounded-lg">
                        <img
                            src="/images/children-smiling-group.webp"
                            alt="Children smiling together at school"
                            className="h-64 w-full object-cover"
                        />
                    </div>

                    <div className="mt-10">
                        <SdgIcons linkToGoals={false} />
                    </div>

                    <div className="mt-16 space-y-10">
                        {goals.map((goal) => (
                            <div
                                key={goal.number}
                                className="border-b border-gray-100 pb-8 last:border-0"
                            >
                                <h3 className="font-heading text-lg font-bold text-brand-text">
                                    Goal {goal.number}, {goal.title}
                                </h3>
                                <p className="mt-3 leading-relaxed text-brand-gray">
                                    {goal.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
