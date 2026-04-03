import { Head } from '@inertiajs/react';
import { useState } from 'react';
import SectionHeading from '@/components/public/section-heading';
import ImageLightbox from './components/image-lightbox';

const projects = [
    {
        id: 'sos-malta',
        title: 'SOS Malta, Uganda',
        description:
            'Our first project was launched in June 2016 in collaboration with SOS Malta, a leading NGO with decades of experience in assisting people around the world through projects of a social and charitable nature. Through this initiative Romy Foods is currently providing 2,000 daily meals to children attending primary schools in Jinja, in the Buikwe District of Uganda.',
        quote: {
            text: 'How wonderful to see the excitement about having a cup of porridge and to understand that with \u2018A Meal for A Meal\u2019 Uganda will have better students not going hungry again. Together with Romy Foods we have managed to create a community amongst the people, knowing that they are being supported by so many hundreds of Romy Foods customers.',
            author: 'Claudia Taylor East',
            color: 'brand-gold',
        },
        images: [
            { src: '/images/projects-hero.webp', alt: 'St. Charles Lwanga school' },
            { src: '/images/projects-expansion.webp', alt: 'Reaching more school children' },
            { src: '/images/original/SOS-Malta-019-870x450.webp', alt: 'School building in Uganda' },
            { src: '/images/original/SOS-Malta-105-870x450.webp', alt: 'Children being served porridge' },
            { src: '/images/original/SOS-Malta-122-870x450.webp', alt: 'Children queuing for meals' },
            { src: '/images/original/SOS-Malta-162.webp', alt: 'Children with cups at school grounds' },
            { src: '/images/original/SOS-Malta-163-870x450.webp', alt: 'Children waiting for meals' },
            { src: '/images/original/AMFAM-3-870x450.webp', alt: 'Volunteer serving porridge' },
            { src: '/images/original/AMFAM_2.webp', alt: 'Children smiling in classroom' },
            { src: '/images/original/AMFAM_3.webp', alt: 'Group photo with children and staff' },
        ],
    },
    {
        id: 'jc-soup-kitchen',
        title: 'JC Soup Kitchen, South Africa',
        description:
            'Our first project in South Africa: a soup kitchen in Jacobsville providing daily meals to children in the community. Through local volunteers and partnerships, we bring warm meals to those who need them most.',
        images: [
            { src: '/images/original/20190613_162859-870x450.webp', alt: 'Partnership handshake with children' },
            { src: '/images/original/JC-11-870x450.webp', alt: 'Volunteers preparing meals' },
            { src: '/images/original/JC-4-870x450.webp', alt: 'Children gathered at the soup kitchen' },
            { src: '/images/original/JC-5-870x450.webp', alt: 'Children queuing for food outdoors' },
            { src: '/images/original/JC-7-870x450.webp', alt: 'Children eating at the soup kitchen' },
        ],
    },
    {
        id: 'st-bernadette',
        title: 'St. Bernadette Primary School, Jinja',
        description:
            'Daily feeding programme at St. Bernadette Nursery and Primary School in Nakibizzi, Jinja, Uganda. The school management, staff and pupils extend their deepest gratitude to all the generous donors.',
        images: [
            { src: '/images/children-holding-meals.webp', alt: 'Children holding meals' },
            { src: '/images/children-eating-at-table.webp', alt: 'Children eating at table' },
            { src: '/images/children-smiling-group.webp', alt: 'Children smiling together' },
            { src: '/images/kitchen-meal-serving.webp', alt: 'Meals being served in the kitchen' },
            { src: '/images/students-eating-veranda.webp', alt: 'Students eating on the veranda' },
            { src: '/images/children-lunchtime-schoolyard.webp', alt: 'Lunchtime in the schoolyard' },
            { src: '/images/boy-eating-schoolyard.webp', alt: 'Boy eating at school' },
            { src: '/images/children-eating-courtyard.webp', alt: 'Children eating in the courtyard' },
            { src: '/images/child-drinking-closeup.webp', alt: 'Child drinking from a cup' },
            { src: '/images/children-queuing-with-cups.webp', alt: 'Children queuing with cups' },
            { src: '/images/students-eating-lunch.webp', alt: 'Students eating lunch' },
            { src: '/images/food-supply-maize-flour.webp', alt: 'Maize flour supply' },
            { src: '/images/food-supply-storeroom.webp', alt: 'Food storeroom' },
            { src: '/images/food-supply-storeroom-full.webp', alt: 'Fully stocked storeroom' },
            { src: '/images/food-supply-flour-sacks.webp', alt: 'Flour sacks' },
            { src: '/images/food-supply-sacks-storage.webp', alt: 'Food sacks in storage' },
            { src: '/images/food-supply-sacks-yellow.webp', alt: 'Yellow food supply sacks' },
            { src: '/images/food-supply-warehouse.webp', alt: 'Food warehouse' },
        ],
        extra: (
            <div className="mt-8 text-center">
                <img
                    src="/images/st-bernadette-appreciation-letter.webp"
                    alt="Appreciation letter from St. Bernadette Primary School"
                    loading="lazy"
                    className="mx-auto max-w-lg rounded-lg shadow-lg"
                />
                <p className="mt-3 text-sm text-brand-gray">
                    Letter of appreciation from Sr. Lucy Kabagweri, Head Teacher
                </p>
            </div>
        ),
    },
];

function GalleryGrid({ images }: { images: { src: string; alt: string }[] }) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {images.map((img, i) => (
                    <button
                        key={img.src}
                        type="button"
                        onClick={() => setLightboxIndex(i)}
                        className="group cursor-pointer overflow-hidden rounded-lg shadow"
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>
            {lightboxIndex !== null && (
                <ImageLightbox
                    images={images}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </>
    );
}

export default function Projects() {
    return (
        <>
            <Head title="Our Projects — School Feeding Programmes in Africa">
                <meta name="description" content="A Meal For A Meal runs school feeding programmes in Uganda and South Africa, providing thousands of daily meals to children through partnerships with SOS Malta and local organizations." />
            </Head>

            {/* Hero */}
            <section className="relative px-4 py-20 text-center text-white md:py-28">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/original/SOS-Malta-122-870x450.webp')" }}
                >
                    <div className="h-full w-full bg-black/60" />
                </div>
                <div className="relative mx-auto max-w-4xl">
                    <h1 className="font-heading text-3xl font-bold uppercase tracking-wider md:text-4xl">
                        Our Projects
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/80">
                        In line with Romy Foods' global expansion, we strive to
                        grow A Meal for A Meal as more meals are sold worldwide
                        through the Romy Foods System.
                    </p>
                </div>
            </section>

            {/* Anchor Nav */}
            <nav className="sticky top-[89px] z-40 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto flex max-w-4xl items-center justify-center gap-2 overflow-x-auto px-4 py-3">
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={`#${project.id}`}
                            className="whitespace-nowrap rounded-full border border-brand-gold/30 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-wider text-brand-text transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-white"
                        >
                            {project.id === 'st-bernadette' ? 'St. Bernadette' : project.title.split(',')[0]}
                        </a>
                    ))}
                </div>
            </nav>

            {/* Founder Quote */}
            <section className="bg-brand-gold px-4 py-10">
                <div className="mx-auto max-w-3xl text-center">
                    <blockquote className="text-base leading-relaxed text-brand-dark italic md:text-lg">
                        &ldquo;At Romy Foods we take our Global Food Program
                        very seriously. Through A Meal for A Meal we have
                        defined our commitment to help reduce world
                        famine.&rdquo;
                    </blockquote>
                    <p className="mt-3 font-heading text-sm font-semibold text-brand-dark/70">
                        Rickard Gillblad, Romy Foods CEO and Founder
                    </p>
                </div>
            </section>

            {/* Project Sections */}
            {projects.map((project, idx) => (
                <section
                    key={project.id}
                    id={project.id}
                    className={`scroll-mt-36 px-4 py-16 ${idx % 2 === 1 ? 'bg-gray-50' : ''}`}
                >
                    <div className="mx-auto max-w-4xl">
                        <h2 className="font-heading text-2xl font-bold uppercase tracking-wider text-brand-text md:text-3xl">
                            {project.title}
                        </h2>
                        <p className="mt-4 max-w-3xl leading-relaxed text-brand-gray">
                            {project.description}
                        </p>

                        {project.quote && (
                            <blockquote className={`mt-6 rounded-lg border-l-4 border-${project.quote.color} bg-gray-50 p-5`}>
                                <p className="leading-relaxed text-brand-gray italic">
                                    &ldquo;{project.quote.text}&rdquo;
                                </p>
                                <footer className={`mt-3 font-heading text-sm font-semibold text-${project.quote.color}`}>
                                    &mdash; {project.quote.author}
                                </footer>
                            </blockquote>
                        )}

                        <div className="mt-8">
                            <GalleryGrid images={project.images} />
                        </div>

                        {project.extra}
                    </div>
                </section>
            ))}

            {/* Videos */}
            <section className="bg-gray-50 px-4 py-16">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading title="See It in Action" />
                    <div className="mt-8">
                        <video src="/images/school-feeding-program-video-3.mp4" autoPlay muted loop playsInline className="w-full rounded-lg shadow" />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <video src="/images/school-feeding-program-video-1.mp4" autoPlay muted loop playsInline className="w-full rounded-lg shadow" />
                        <video src="/images/school-feeding-program-video-2.mp4" autoPlay muted loop playsInline className="w-full rounded-lg shadow" />
                        <video src="/images/school-feeding-program-video-4.mp4" autoPlay muted loop playsInline className="w-full rounded-lg shadow" />
                    </div>
                </div>
            </section>
        </>
    );
}
