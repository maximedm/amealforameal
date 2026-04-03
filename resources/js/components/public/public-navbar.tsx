import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'News', href: '/news' },
    { label: 'Our Story', href: '/our-story' },
    { label: 'Goals', href: '/goals' },
    { label: 'Projects', href: '/projects' },
    { label: 'Partners', href: '/partners' },
];

export default function PublicNavbar() {
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
                <Link href="/" className="flex-shrink-0">
                    <img
                        src="/images/amfam-logo.webp"
                        alt="A Meal For A Meal"
                        className="h-16 w-auto"
                    />
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === '/'
                                ? url === '/'
                                : url.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                prefetch
                                className={`px-4 py-2 font-heading text-xs font-semibold uppercase tracking-widest transition-colors ${
                                    isActive
                                        ? 'text-brand-gold'
                                        : 'text-brand-text hover:text-brand-gold'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    type="button"
                    className="lg:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileOpen}
                >
                    {mobileOpen ? (
                        <X className="size-6 text-brand-text" />
                    ) : (
                        <Menu className="size-6 text-brand-text" />
                    )}
                </button>
            </div>

            {mobileOpen && (
                <nav className="border-t border-gray-100 bg-white px-4 pb-4 lg:hidden">
                    {navLinks.map((link) => {
                        const isActive =
                            link.href === '/'
                                ? url === '/'
                                : url.startsWith(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-3 font-heading text-sm font-semibold uppercase tracking-widest ${
                                    isActive
                                        ? 'text-brand-gold'
                                        : 'text-brand-text hover:text-brand-gold'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}
