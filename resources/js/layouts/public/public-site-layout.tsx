import { Head } from '@inertiajs/react';
import PublicNavbar from '@/components/public/public-navbar';
import PublicFooter from '@/components/public/public-footer';

export default function PublicSiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=montserrat:400,500,600,700,800&lato:300,400,700"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen font-body text-brand-text">
                <PublicNavbar />
                <main>{children}</main>
                <PublicFooter />
            </div>
        </>
    );
}
