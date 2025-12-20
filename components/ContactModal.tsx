'use client';

import ContactForm from './ContactForm';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-lg p-4">
            <div className="w-full max-w-lg bg-black border border-[var(--neon)] p-8 relative shadow-[0_0_50px_rgba(57,255,20,0.1)]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    ESC
                </button>

                <h2 className="text-2xl font-bold mb-6 neon-text">
                    DEPLOY ZERO
                </h2>

                <ContactForm onSuccess={onClose} />
            </div>
        </div>
    );
}

