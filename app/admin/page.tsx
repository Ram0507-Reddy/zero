'use client';

import { useActionState } from 'react';
import { login } from './actions';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
    const [state, formAction, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-neon selection:text-black">
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-lg p-8 shadow-[0_0_50px_rgba(34,197,94,0.1)]">

                <div className="text-center mb-8">
                    <div className="inline-flex p-4 rounded-full bg-neon/10 text-neon mb-4">
                        <Shield size={48} />
                    </div>
                    <h1 className="text-3xl font-mono font-bold text-white tracking-tighter">
                        ZERO<span className="text-neon">ADMIN</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Restricted Access. Authorized Personnel Only.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-xs font-mono text-neon mb-2 uppercase">Command Access ID</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="admin@zerotech"
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-neon focus:outline-none transition-colors font-mono"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-neon mb-2 uppercase">Secure Passphrase</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full bg-black border border-white/20 rounded p-3 text-white focus:border-neon focus:outline-none transition-colors font-mono"
                            required
                        />
                    </div>

                    {state?.error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-mono text-center">
                            ACCESS DENIED: {state.error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-neon text-black font-bold py-4 rounded hover:bg-white transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Authenticating...' : 'Enter Console'}
                    </button>
                </form>
            </div>
        </div>
    );
}
