import { Link } from '@inertiajs/react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer>
            <div className="bg-brand-dark px-4 py-16 text-gray-400">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <img
                                src="/images/logo-white-amfam.webp"
                                alt="A Meal For A Meal"
                                className="h-40 w-auto"
                                style={{ filter: 'brightness(0) saturate(100%) invert(75%) sepia(40%) saturate(600%) hue-rotate(350deg) brightness(95%)' }}
                            />
                            <p className="text-sm leading-relaxed">
                                A Meal for A Meal is the Romy Foods global food
                                programme with the aim of helping defeat global
                                hunger.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                                Contact
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-gold" />
                                    <span>
                                        Romy Foods Corporation Ltd. Junction
                                        Business Centre, 1st Floor, Sqaq
                                        Lourdes, St Julian's, SWQ 3334, Malta
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="size-4 shrink-0 text-brand-gold" />
                                    <span>(+356) 21666933</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="size-4 shrink-0 text-brand-gold" />
                                    <span>info@romyfoods.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Globe className="size-4 shrink-0 text-brand-gold" />
                                    <a
                                        href="https://www.romyfoods.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-white"
                                    >
                                        www.romyfoods.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/our-story" className="hover:text-white">
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/projects" className="hover:text-white">
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/goals" className="hover:text-white">
                                        Goals
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/partners" className="hover:text-white">
                                        Partners
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/news" className="hover:text-white">
                                        News
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-brand-gold-light px-4 py-4 text-center">
                <p className="text-sm font-medium text-brand-dark">
                    &copy; {new Date().getFullYear()} A Meal For A Meal, Inc.
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
}
