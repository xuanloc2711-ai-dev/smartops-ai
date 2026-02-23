import './globals.css';

export const metadata = {
    title: 'SmartOps-AI Admin',
    description: 'Admin Portal for SmartOps-AI',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className="bg-slate-50 text-slate-900 font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
