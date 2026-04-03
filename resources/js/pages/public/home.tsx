import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MealCounter from '@/components/public/meal-counter';
import SdgIcons from '@/components/public/sdg-icons';
import SectionHeading from '@/components/public/section-heading';

export default function Home() {
    return (
        <>
            <Head title="Home" />

            {/* Hero Section */}
            <section className="relative px-4 py-28 text-center text-white md:py-44">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/students-eating-lunch.jpeg')" }}
                >
                    <div className="h-full w-full bg-black/60" />
                </div>
                <div className="relative mx-auto max-w-4xl">
                    <img
                        src="/images/logo-white-amfam.png"
                        alt="A Meal For A Meal"
                        className="mx-auto mb-8 h-40 w-auto md:h-52"
                    />
                    <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-white/80">
                        The Romy Foods global food programme
                    </p>
                    <p className="mt-2 font-heading text-xs uppercase tracking-[0.15em] text-white/60">
                        Contributes to United Nations Sustainable Development
                        Goals
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="bg-brand-gold px-4 py-6">
                <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 md:flex-row md:gap-12">
                    <p className="font-heading text-sm font-bold uppercase tracking-wider text-brand-dark md:text-base">
                        1 Meal Sold = 1 Meal Given
                        <span className="mx-2 hidden md:inline">|</span>
                        <br className="md:hidden" />
                        to those who need it most
                    </p>
                    <div className="flex items-baseline gap-3">
                        <MealCounter className="[&_span]:text-2xl [&_span]:text-brand-dark [&_span]:font-extrabold md:[&_span]:text-3xl" />
                        <p className="font-heading text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                            Meals Provided
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="px-4 py-16">
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
                    <div>
                        <img
                            src="/images/our-story.jpg"
                            alt="Children at school in Uganda"
                            loading="lazy"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <SectionHeading
                            title="Our Story"
                            className="text-left"
                        />
                        <p className="mt-6 leading-relaxed text-brand-gray">
                            A Meal for A Meal was launched in 2016 with the aim
                            of helping defeat global hunger. Our story started
                            when Rickard Gillblad, Romy Foods CEO and founder
                            came across a map showing how much food is wasted in
                            Europe and the level of famine in Africa.
                        </p>
                        <div className="mt-6">
                            <Button variant="brand" size="lg" asChild>
                                <Link href="/our-story">Our Story</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Romy Foods */}
            <section className="bg-brand-green px-4 py-16 text-center text-white">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading title="Romy Foods" light />
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/90">
                        Romy Foods is an international food network encompassing
                        the whole value chain in the provision of quality
                        ready-made meals. Through frozen meals delivered in Torus
                        Pak&reg; technology, Romy Foods delivers its products to
                        a wide range of clients worldwide.
                    </p>
                    <div className="mt-8">
                        <Button
                            variant="brand"
                            size="lg"
                            asChild
                            className="bg-white text-brand-green hover:bg-white/90"
                        >
                            <a
                                href="https://www.romyfoods.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Romy Foods
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* UN SDG Goals */}
            <section className="px-4 py-16 text-center">
                <div className="mx-auto max-w-4xl">
                    <p className="mb-8 font-heading text-sm font-bold uppercase tracking-wider text-brand-text">
                        As Romy Foods we are committed to the United Nations
                        Sustainable Development Goals.
                    </p>
                    <SdgIcons />
                </div>
            </section>

            {/* Projects */}
            <section className="bg-brand-gold-light px-4 py-16">
                <div className="mx-auto max-w-4xl text-center">
                    <SectionHeading title="Projects" />
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-text">
                        Launched in June 2016 in collaboration with SOS Malta,
                        our first project is currently providing 2,000 daily
                        meals to children attending primary schools in Jinja, in
                        the Buikwe District of Uganda.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <img src="/images/children-queuing-with-cups.jpeg" alt="Children queuing with cups" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/kitchen-meal-serving.jpeg" alt="Meals being served in the kitchen" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/students-eating-lunch.jpeg" alt="Students eating lunch" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/child-drinking-closeup.jpeg" alt="Child drinking from a cup" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                    </div>
                    <div className="mt-8">
                        <Button variant="brand" size="lg" asChild>
                            <Link href="/projects">See Our Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="px-4 py-16 text-center">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading title="Partners" />
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-gray">
                        Our first project was launched in June 2016 in
                        collaboration with SOS Malta, a leading NGO with decades
                        of experience in assisting people around the world
                        through projects of a social and charitable nature.
                    </p>
                    <p className="mt-6 font-heading text-sm font-semibold uppercase tracking-wider text-brand-text">
                        Together toward a common goal, A Meal for A Meal is
                        supported by:
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
                        <img
                            src="/images/partners/sos.jpg"
                            alt="SOS Malta"
                            loading="lazy"
                            className="h-24 w-auto object-contain"
                        />
                        <img
                            src="/images/partners/toruspak.jpg"
                            alt="Torus Pak"
                            loading="lazy"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                    <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-brand-gray">
                        As part of the Romy Foods family, BonCulina and Fiffis
                        also contribute to providing meals where they are most
                        needed, through A Meal for A Meal.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
                        <img
                            src="/images/partners/bonculina.jpg"
                            alt="BonCulina"
                            loading="lazy"
                            className="h-24 w-auto object-contain"
                        />
                        <img
                            src="/images/partners/fiffis.png"
                            alt="Fiffis"
                            loading="lazy"
                            className="h-24 w-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* Founder Quote */}
            <section className="bg-gray-50 px-4 py-16">
                <div className="mx-auto max-w-3xl text-center">
                    <blockquote className="text-lg leading-relaxed text-brand-gray italic">
                        &ldquo;We have only borrowed this planet from our
                        children. Aiming to becoming more sustainable is
                        necessary for future generations of this world and to
                        ensure sustainable development for all individuals
                        without any preference or discrimination. Corporate
                        bodies, governments and organisations need to line up
                        behind one and the same sustainable development
                        agenda.&rdquo;
                    </blockquote>
                    <p className="mt-6 font-heading text-sm font-semibold text-brand-gold">
                        Rickard Gillblad, Founder and CEO Romy Foods
                        Corporation Ltd.
                    </p>
                </div>
            </section>
        </>
    );
}
