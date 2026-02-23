import OmnichannelInbox from '@/components/OmnichannelInbox';

export default function Home() {
    return (
        <main className="min-h-screen p-4 flex flex-col gap-4">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-blue-600">SmartOps-AI Dashboard</h1>
            </header>

            {/* Feature 1: Omnichannel Inbox */}
            <section className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <OmnichannelInbox />
            </section>
        </main>
    );
}
