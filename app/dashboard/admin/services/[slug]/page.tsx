import AdminGuard from "@/components/AdminGuard";
import { getServiceBySlug } from "@/lib/services";
import { updateServiceAction } from "@/app/dashboard/admin/actions";
import { getCsrfToken } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    const csrfToken = await getCsrfToken();

    if (!service) notFound();

    return (
        <AdminGuard>
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/suite/admin/dashboard" className="text-gray-500 hover:text-white text-xs mb-6 block">
                    ← Back to Dashboard
                </Link>

                <h1 className="text-2xl font-bold mb-8 neon-text">CONFIGURE MODULE: {service.name.toUpperCase()}</h1>

                <form action={updateServiceAction.bind(null, slug)} className="space-y-8">
                    <input type="hidden" name="csrf_token" value={csrfToken || ''} />

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b border-white/10 pb-2">GENERAL INFO</h2>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">SERVICE NAME</label>
                            <input name="name" defaultValue={service.name} required className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]" />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">DESCRIPTION</label>
                            <textarea name="description" defaultValue={service.description} rows={3} required className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]"></textarea>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b border-white/10 pb-2">MARKETING ASSETS</h2>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">FEATURES (Comma Separated)</label>
                            <textarea name="features" defaultValue={service.features.join(', ')} rows={3} className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]"></textarea>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">PROS (Comma Separated)</label>
                            <textarea name="pros" defaultValue={service.pros.join(', ')} rows={3} className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]"></textarea>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b border-white/10 pb-2">COMPETITIVE ANALYSIS</h2>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">COMPETITOR NAME</label>
                            <input name="competitorName" defaultValue={service.comparison.competitorName} className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]" />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">COMPETITOR CONS (Comma Separated)</label>
                            <textarea name="competitorCons" defaultValue={service.comparison.competitorCons.join(', ')} rows={3} className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]"></textarea>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-500 mb-1">ZERO ADVANTAGES (Comma Separated)</label>
                            <textarea name="zeroAdvantages" defaultValue={service.comparison.zeroAdvantages.join(', ')} rows={3} className="w-full bg-black border border-white/20 p-3 text-white outline-none focus:border-[var(--neon)]"></textarea>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <button className="w-full py-4 bg-[var(--neon)] text-black font-bold hover:bg-[#2bc90e] transition-all">
                            SAVE CONFIGURATION
                        </button>
                    </div>

                </form>
            </div>
        </AdminGuard>
    );
}
