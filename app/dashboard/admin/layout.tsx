import ToastListener from "@/components/ToastListener";

export const dynamic = "force-dynamic";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-[var(--neon)] selection:text-black">
            <ToastListener />
            {children}
        </div>
    );
}
