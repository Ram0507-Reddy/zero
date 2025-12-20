import AdminGuard from "@/components/AdminGuard";
import { getAllServices } from "@/lib/services";
import { toggleServiceAction, logoutAction } from "@/app/admin/actions";
import { getCsrfToken } from "@/lib/auth";
import Link from 'next/link';

// Disable caching for admin dash to seeing live updates
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const services = await getAllServices();
    const csrfToken = await getCsrfToken();

    return (
        <AdminGuard>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-bold neon-text">SYSTEM CONTROL</h1>
                    <form action={logoutAction}>
                        <button className="text-xs text-red-500 hover:text-red-400 border border-red-900 px-4 py-2 hover:bg-red-900/20">
                            TERMINATE SESSION
                        </button>
                    </form>
                </div>

                <div className="grid gap-4">
                    {services.map((service) => (
                        <div key={service.slug} className="bg-white/5 border border-white/10 p-4 flex items-center justify-between hover:border-[var(--neon)] transition-all">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-white text-lg">{service.name}</h3>
                                    <span className={`text-[10px] px-2 py-0.5 border ${service.enabled ? 'border-[var(--neon)] text-[var(--neon)]' : 'border-gray-600 text-gray-500'}`}>
                                        {service.enabled ? 'ONLINE' : 'OFFLINE'}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{service.slug}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <form action={toggleServiceAction.bind(null, service.slug, !service.enabled)}>
                                    <input type="hidden" name="csrf_token" value={csrfToken || ''} />
                                    <button className="text-xs uppercase font-mono text-gray-400 hover:text-white">
                                        {service.enabled ? 'DISABLE' : 'ENABLE'}
                                    </button>
                                </form>

                                <Link
                                    href={`/admin/services/${service.slug}`}
                                    className="px-4 py-2 bg-[var(--neon)] text-black text-xs font-bold hover:bg-[#2bc90e]"
                                >
                                    CONFIGURE
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminGuard>
    );
}
