import Navbar from "@/components/Navbar";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} ZERO SUITE. ALL RIGHTS RESERVED.</p>
            </footer>
        </div>
    );
}
