import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import MealCounter from '@/components/public/meal-counter';
import SdgIcons from '@/components/public/sdg-icons';
import SectionHeading from '@/components/public/section-heading';

export default function Home() {
    return (
        <>
            <Head title="Every Meal Sold Feeds a Child in Need">
                <link rel="preload" href="/images/original/SOS-Malta-162.webp" as="image" imageSrcSet="/images/original/SOS-Malta-162-640w.webp 640w, /images/original/SOS-Malta-162-1024w.webp 1024w, /images/original/SOS-Malta-162.webp 1920w" imageSizes="100vw" />
                <meta name="description" content="A Meal For A Meal, the Romy Foods flagship CSR programme, celebrates 10 years of impact — providing 2,000 daily meals to school children in Uganda since 2016." />
            </Head>

            {/* Hero Section */}
            <section className="relative px-4 py-28 text-center text-white md:py-44">
                <div className="absolute inset-0">
                    <img
                        src="/images/original/SOS-Malta-162.webp"
                        srcSet="/images/original/SOS-Malta-162-640w.webp 640w, /images/original/SOS-Malta-162-1024w.webp 1024w, /images/original/SOS-Malta-162.webp 1920w"
                        sizes="100vw"
                        alt="Children at school in Uganda"
                        className="h-full w-full object-cover"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="relative mx-auto max-w-4xl">
                    <img
                        src="/images/logo-white-amfam.webp"
                        alt="A Meal For A Meal"
                        className="mx-auto mb-8 h-40 w-auto md:h-52"
                    />
                    <h1 className="mt-6 font-heading text-2xl font-bold uppercase tracking-wider text-white md:text-4xl">
                        Every Meal We Sell Feeds a Child Who Goes Without
                    </h1>
                    <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                        The Romy Foods global food programme
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
                        <MealCounter className="[&_span]:text-2xl [&_span]:text-brand-dark [&_span]:font-bold md:[&_span]:text-3xl" />
                        <p className="font-heading text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                            Meals Provided
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-4 py-16">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading title="How It Works" />
                    <div className="mt-10 grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-gold/20">
                                <span className="font-heading text-2xl font-bold text-brand-gold">1</span>
                            </div>
                            <h3 className="mt-4 font-heading text-lg font-bold text-brand-text">A Meal Is Sold</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                                Romy Foods delivers quality meals to clients worldwide. Every meal sold triggers the programme.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-green/20">
                                <span className="font-heading text-2xl font-bold text-brand-green">2</span>
                            </div>
                            <h3 className="mt-4 font-heading text-lg font-bold text-brand-text">We Match It</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                                For every meal served, we reduce food waste by approximately 180g and buy back the same amount of local food in Africa.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-gold/20">
                                <span className="font-heading text-2xl font-bold text-brand-gold">3</span>
                            </div>
                            <h3 className="mt-4 font-heading text-lg font-bold text-brand-text">A Child Eats</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                                That food becomes a warm meal for a child at school in Uganda or South Africa. One meal sold, one meal given.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="bg-gray-50 px-4 py-16">
                <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
                    <div>
                        <img
                            src="/images/our-story.webp"
                            srcSet="/images/our-story-640w.webp 640w, /images/our-story.webp 1024w"
                            sizes="(max-width: 768px) 100vw, 50vw"
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
                            Aligned with our CSR priorities, our flagship
                            programme, Meal for a Meal, established in June 2016
                            in collaboration with SOS Malta, celebrates 10 years
                            of sustained impact, providing 2,000 daily meals to
                            primary school children in Jinja, Buikwe District,
                            Uganda.
                        </p>
                        <div className="mt-6">
                            <Button variant="brand" size="lg" asChild>
                                <Link href="/our-story">Read Our Story</Link>
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
                        Romy Foods delivers millions of meals across the world.
                        For every one sold, another goes to a child in need.
                        That&rsquo;s not a side project &mdash; it&rsquo;s built
                        into how the business works.
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
                        Committed to the United Nations Sustainable Development
                        Goals
                    </p>
                    <SdgIcons />
                </div>
            </section>

            {/* Projects */}
            <section className="bg-brand-gold-light px-4 py-16">
                <div className="mx-auto max-w-4xl text-center">
                    <SectionHeading title="Projects" />
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-text">
                        Aligned with our CSR priorities, our flagship programme,
                        Meal for a Meal, established in June 2016 in
                        collaboration with SOS Malta, celebrates 10 years of
                        sustained impact, providing 2,000 daily meals to primary
                        school children in Jinja, Buikwe District, Uganda.
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        <img src="/images/children-queuing-with-cups.webp" srcSet="/images/children-queuing-with-cups-640w.webp 640w, /images/children-queuing-with-cups-1024w.webp 1024w, /images/children-queuing-with-cups.webp 1200w" sizes="(max-width: 768px) 50vw, 25vw" alt="Children queuing with cups" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/kitchen-meal-serving.webp" srcSet="/images/kitchen-meal-serving-640w.webp 640w, /images/kitchen-meal-serving.webp 800w" sizes="(max-width: 768px) 50vw, 25vw" alt="Meals being served in the kitchen" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/students-eating-lunch.webp" srcSet="/images/students-eating-lunch-640w.webp 640w, /images/students-eating-lunch-1024w.webp 1024w, /images/students-eating-lunch.webp 1200w" sizes="(max-width: 768px) 50vw, 25vw" alt="Students eating lunch" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                        <img src="/images/child-drinking-closeup.webp" srcSet="/images/child-drinking-closeup-640w.webp 640w, /images/child-drinking-closeup-1024w.webp 1024w, /images/child-drinking-closeup.webp 1200w" sizes="(max-width: 768px) 50vw, 25vw" alt="Child drinking from a cup" loading="lazy" className="aspect-square w-full rounded-lg object-cover shadow" />
                    </div>
                    <div className="mt-8">
                        <Button variant="brand" size="lg" asChild>
                            <Link href="/projects">See Our Projects</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="px-4 py-16">
                <div className="mx-auto max-w-5xl">
                    <SectionHeading title="Voices from the Field" />
                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                        <blockquote className="rounded-lg border-l-4 border-brand-gold bg-gray-50 p-6">
                            <p className="leading-relaxed text-brand-gray italic">
                                &ldquo;How wonderful to see the excitement about
                                having a cup of porridge and to understand that
                                with A Meal for A Meal, Uganda will have better
                                students not going hungry again.&rdquo;
                            </p>
                            <footer className="mt-4 font-heading text-sm font-semibold text-brand-gold">
                                &mdash; Claudia Taylor East, SOS Malta
                            </footer>
                        </blockquote>
                        <blockquote className="rounded-lg border-l-4 border-brand-green bg-gray-50 p-6">
                            <p className="leading-relaxed text-brand-gray italic">
                                &ldquo;We have only borrowed this planet from our
                                children. Aiming to become more sustainable is
                                necessary for future generations of this
                                world.&rdquo;
                            </p>
                            <footer className="mt-4 font-heading text-sm font-semibold text-brand-green">
                                &mdash; Rickard Gillblad, Founder &amp; CEO, Romy
                                Foods
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="bg-gray-50 px-4 py-16 text-center">
                <div className="mx-auto max-w-4xl">
                    <SectionHeading title="Partners" />
                    <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-gray">
                        Defeating hunger takes more than one organization. These
                        partners make A Meal for A Meal possible.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
                        <img src="/images/partners/sos.webp" alt="SOS Malta" loading="lazy" className="h-20 w-auto object-contain" />
                        <img src="/images/partners/toruspak.webp" alt="Torus Pak" loading="lazy" className="h-20 w-auto object-contain" />
                        <img src="/images/partners/bonculina.webp" alt="BonCulina" loading="lazy" className="h-20 w-auto object-contain" />
                        <img src="/images/partners/fiffis.webp" alt="Fiffis" loading="lazy" className="h-20 w-auto object-contain" />
                    </div>
                    <div className="mt-6">
                        <Button variant="brand" size="lg" asChild>
                            <Link href="/partners">Meet Our Partners</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-brand-dark px-4 py-20 text-center text-white">
                <div className="mx-auto max-w-3xl">
                    <h2 className="font-heading text-2xl font-bold uppercase tracking-wider md:text-3xl">
                        Every Meal Makes a Difference
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">
                        When you choose Romy Foods, you&rsquo;re not just buying
                        a meal &mdash; you&rsquo;re giving one to a child who
                        needs it most.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button
                            variant="brand"
                            size="lg"
                            asChild
                        >
                            <a
                                href="https://www.romyfoods.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Visit Romy Foods
                            </a>
                        </Button>
                        <Button
                            variant="brand"
                            size="lg"
                            asChild
                            className="border-2 border-white bg-transparent hover:bg-white/10"
                        >
                            <Link href="/our-story">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
