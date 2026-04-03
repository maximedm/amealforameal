import { Head } from '@inertiajs/react';
import SectionHeading from '@/components/public/section-heading';

const partners = [
    {
        name: 'SOS Malta',
        logo: '/images/partners/sos.webp',
        description:
            'A leading NGO with decades of experience in assisting people around the world through projects of a social and charitable nature.',
    },
    {
        name: 'Torus Pak',
        logo: '/images/partners/toruspak.webp',
        description:
            'Through Torus Pak technology, Romy Foods delivers frozen meals to a wide range of clients worldwide, providing cost-effective meals to every meal sold.',
    },
    {
        name: 'BonCulina',
        logo: '/images/partners/bonculina.webp',
        description:
            'As part of the Romy Foods family, BonCulina contributes to providing meals where they are most needed through A Meal for A Meal.',
    },
    {
        name: 'Fiffis',
        logo: '/images/partners/fiffis.webp',
        description:
            'As part of the Romy Foods family, Fiffis also contributes to providing meals where they are most needed through A Meal for A Meal.',
    },
];

export default function Partners() {
    return (
        <>
            <Head title="Partners — Organizations Behind A Meal For A Meal">
                <meta name="description" content="A Meal For A Meal is made possible through partnerships with SOS Malta, Torus Pak, BonCulina, and Fiffis — organizations committed to defeating global hunger together." />
            </Head>

            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading
                        as="h1"
                        title="Partners"
                        subtitle="Defeating hunger takes more than one organization. These partners make A Meal for A Meal possible."
                    />

                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        {partners.map((partner) => (
                            <div
                                key={partner.name}
                                className="rounded-lg border border-gray-200 p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="mx-auto mb-4 h-20 w-auto object-contain"
                                />
                                <h3 className="font-heading text-lg font-bold text-brand-text">
                                    {partner.name}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                                    {partner.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
