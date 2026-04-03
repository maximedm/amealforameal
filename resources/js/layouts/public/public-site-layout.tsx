import PublicNavbar from '@/components/public/public-navbar';
import PublicFooter from '@/components/public/public-footer';

export default function PublicSiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="min-h-screen font-body text-brand-text">
                <PublicNavbar />
                <main>{children}</main>
                <PublicFooter />
            </div>
        </>
    );
}
