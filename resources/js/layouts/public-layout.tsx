import PublicSiteLayout from '@/layouts/public/public-site-layout';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <PublicSiteLayout>{children}</PublicSiteLayout>;
}
