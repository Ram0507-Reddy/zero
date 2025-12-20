'use client';

import { loginAction } from "@/app/admin/actions";
import { useState } from "react";

export default function LoginPage() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const res = await loginAction(formData);
        if (res?.success === false) {
            setError(res.message);
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm border border-white/10 p-8 bg-white/5">
                <h1 className="text-2xl font-bold mb-6 text-center neon-text">SYSTEM ACCESS</h1>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">MASTER PASSWORD</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full bg-black border border-white/20 p-2 text-white outline-none focus:border-[var(--neon)] focus:shadow-[0_0_10px_rgba(57,255,20,0.2)]"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white/10 border border-white/20 text-white font-bold py-2 hover:bg-[var(--neon)] hover:text-black hover:border-[var(--neon)] transition-all"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ENTER CONSOLE'}
                    </button>
                </form>
            </div>
        </div>
    );
}
