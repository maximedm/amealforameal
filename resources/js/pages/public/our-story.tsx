import { Head } from '@inertiajs/react';
import MealCounter from '@/components/public/meal-counter';
import SectionHeading from '@/components/public/section-heading';

export default function OurStory() {
    return (
        <>
            <Head title="Our Story — How A Meal For A Meal Began">
                <meta name="description" content="In 2016, Romy Foods founder Rickard Gillblad saw the contrast between food waste in Europe and famine in Africa — and decided to act. For every meal sold, one is given to a child in need." />
            </Head>

            <section className="px-4 py-16 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wider text-brand-text md:text-3xl">
                        Our Story
                    </h1>
                    <div className="grid items-start gap-10 md:grid-cols-2">
                        <div>
                            <img
                                src="/images/our-story.webp"
                                alt="Children at school in Uganda"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </div>
                        <div>
                            <p className="leading-relaxed text-brand-gray">
                                Aligned with our CSR priorities, our flagship
                                programme, Meal for a Meal, was established in
                                June 2016 in collaboration with SOS Malta.
                            </p>
                            <p className="mt-4 leading-relaxed text-brand-gray">
                                Our story started when Rickard Gillblad, Romy
                                Foods CEO and founder, came across a map showing
                                how much food is wasted in Europe and the level
                                of famine in Africa. Touched by the numbers, he
                                created the Romy Foods platform to turn food
                                waste reduction into meals for children in
                                Africa.
                            </p>
                            <p className="mt-4 leading-relaxed text-brand-gray">
                                Now celebrating 10 years of sustained impact, the
                                programme provides 2,000 daily meals to primary
                                school children in Jinja, Buikwe District,
                                Uganda.
                            </p>
                            <p className="mt-4 leading-relaxed text-brand-gray">
                                Today, for every meal served worldwide through
                                Romy Foods, we reduce food waste by
                                approximately 180g which is the same amount of
                                local food we buy back in Africa and serve as
                                one meal. Hence, A Meal for A Meal.
                            </p>
                            <p className="mt-4 leading-relaxed text-brand-gray">
                                Our Meal counter below provides a real-time
                                update of the number of children benefiting from
                                A Meal for A Meal.
                            </p>
                        </div>
                    </div>

                    {/* Meal Count */}
                    <div className="mt-16 text-center">
                        <SectionHeading title="Meal Count" />
                        <div className="mt-6">
                            <MealCounter />
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <img src="/images/child-drinking-closeup.webp" alt="Child drinking from a cup" className="h-56 w-full rounded-lg object-cover shadow" />
                        <img src="/images/children-queuing-with-cups.webp" alt="Children queuing with cups" className="h-56 w-full rounded-lg object-cover shadow" />
                        <img src="/images/children-eating-courtyard.webp" alt="Children eating in the courtyard" className="h-56 w-full rounded-lg object-cover shadow" />
                    </div>

                    {/* Interview Link */}
                    <div className="mt-16 border-t border-gray-200 pt-12 text-center">
                        <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-brand-text">
                            Interview with Rickard Gillblad on The Malta
                            Independent
                        </h3>
                        <p className="mt-2 text-sm uppercase tracking-wider text-brand-gray">
                            Maltese company tackling African famine one meal at
                            a time
                        </p>
                        <a
                            href="http://www.independent.com.mt/articles/2016-07-24/local-news/Maltese-company-tackling-African-famine-one-meal-at-a-time-6736161439"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block font-heading text-sm font-semibold text-brand-gold hover:underline"
                        >
                            Read the article &rarr;
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
