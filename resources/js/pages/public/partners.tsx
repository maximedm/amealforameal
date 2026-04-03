import { Head } from '@inertiajs/react';
import SectionHeading from '@/components/public/section-heading';

const partners = [
    {
        name: 'SOS Malta',
        logo: '/images/partners/sos.jpg',
        description:
            'A leading NGO with decades of experience in assisting people around the world through projects of a social and charitable nature.',
    },
    {
        name: 'Torus Pak',
        logo: '/images/partners/toruspak.jpg',
        description:
            'Through Torus Pak technology, Romy Foods delivers frozen meals to a wide range of clients worldwide, providing cost-effective meals to every meal sold.',
    },
    {
        name: 'BonCulina',
        logo: '/images/partners/bonculina.jpg',
        description:
            'As part of the Romy Foods family, BonCulina contributes to providing meals where they are most needed through A Meal for A Meal.',
    },
    {
        name: 'Fiffis',
        logo: '/images/partners/fiffis.png',
        description:
            'As part of the Romy Foods family, Fiffis also contributes to providing meals where they are most needed through A Meal for A Meal.',
    },
];

export default function Partners() {
    return (
        <>
            <Head title="Partners" />

            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading
                        title="Partners"
                        subtitle="Our first project was launched in June 2016 in collaboration with SOS Malta, a leading NGO with decades of experience in assisting people around the world through projects of a social and charitable nature."
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
