'use client';

import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Lock, Shield, Zap, FileText } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const pulseVariants = {
    idle: { scale: 1, opacity: 0.5 },
    active: {
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
        transition: { duration: 2, repeat: Infinity }
    }
};

const FlowLine = ({ from, to, delay }: { from: string, to: string, delay: number }) => (
    <motion.div
        className="absolute h-[2px] bg-neon/30 origin-left z-0"
        style={{
            top: '50%',
            left: '50%',
            width: '150px',
            transform: `translate(-50%, -50%) rotate(${from === 'left' ? '0deg' : from === 'right' ? '180deg' : '90deg'})` // Simplified layout logic
        }}
    >
        <motion.div
            className="w-2 h-2 bg-neon rounded-full shadow-[0_0_10px_var(--neon)]"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay }}
            style={{ offsetPath: `path('M 0 0 L 150 0')` } as any}
        />
    </motion.div>
);

// Simplified grid connector for the demo
function Connector({ className }: { className?: string }) {
    return (
        <div className={`absolute top-1/2 left-1/2 -z-10 h-0.5 bg-white/10 ${className}`} />
    );
}

export default function ArchitectureDemo() {
    return (
        <section className="py-32 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">THE <span className="text-neon">ZERO</span> ARCHITECTURE</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl">
                        Your data never leaves your infrastructure.
                        <br />Microservices run as Docker containers right next to your app.
                    </p>
                </div>

                <div className="relative h-[600px] md:h-[500px] flex items-center justify-center">

                    {/* Central Node: YOUR APP */}
                    <div className="relative z-20">
                        <motion.div
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black border-2 border-white/20 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                            animate={{ boxShadow: ['0 0 20px rgba(255,255,255,0.1)', '0 0 40px rgba(255,255,255,0.2)', '0 0 20px rgba(255,255,255,0.1)'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Smartphone className="text-white w-10 h-10 mb-2" />
                            <span className="font-bold text-white tracking-widest text-sm">YOUR APP</span>
                        </motion.div>
                    </div>

                    {/* Orbiting Service Nodes */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Circle Orbit Track */}
                        <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 absolute" />

                        {/* Nodes positioned absolutely */}
                        <ServiceNode icon={Lock} label="ZERO AUTH" angle={0} color="#22c55e" />
                        <ServiceNode icon={Database} label="ZERO BASE" angle={60} color="#22c55e" />
                        <ServiceNode icon={Zap} label="ZERO CACHE" angle={120} color="#22c55e" />
                        <ServiceNode icon={Server} label="ZERO MEDIA" angle={180} color="#22c55e" />
                        <ServiceNode icon={Shield} label="ZERO WAF" angle={240} color="#22c55e" />
                        <ServiceNode icon={FileText} label="ZERO LOGS" angle={300} color="#22c55e" />
                    </div>

                    {/* Data Packets (Simulated CSS Animations cause Framer offsetPath is complex to setup quickly) */}
                    <div className="absolute inset-0 z-10">
                        <DataPacket angle={0} delay={0} />
                        <DataPacket angle={60} delay={0.5} />
                        <DataPacket angle={120} delay={1} />
                        <DataPacket angle={180} delay={1.5} />
                        <DataPacket angle={240} delay={2} />
                        <DataPacket angle={300} delay={2.5} />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-12">
                    <div className="p-6 border border-white/10 bg-white/5 rounded-lg">
                        <h3 className="text-neon font-mono font-bold text-lg mb-2">0ms Latency</h3>
                        <p className="text-sm text-gray-400">Localhost communication via Docker network.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-white/5 rounded-lg">
                        <h3 className="text-neon font-mono font-bold text-lg mb-2">100% Offline</h3>
                        <p className="text-sm text-gray-400">No internet required. Air-gap ready.</p>
                    </div>
                    <div className="p-6 border border-white/10 bg-white/5 rounded-lg">
                        <h3 className="text-neon font-mono font-bold text-lg mb-2">Own Your Data</h3>
                        <p className="text-sm text-gray-400">Database files live on your disk, not ours.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ServiceNode({ icon: Icon, label, angle, color }: { icon: any, label: string, angle: number, color: string }) {
    // Calculate position on a circle
    // Standard radius 150px (mobile) to 250px (desktop)
    // We'll use CSS transform for simplicity

    return (
        <motion.div
            className="absolute flex flex-col items-center justify-center"
            style={{
                transform: `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`, // Mobile radius
            }}
        // Responsive override (would usually use media query or js hook, sticking to mobile safe default or using calc)
        >
            <div className="w-16 h-16 bg-black border border-neon/50 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)] z-20">
                <Icon size={24} className="text-neon" />
            </div>
            <span className="text-[10px] font-mono mt-2 text-neon font-bold tracking-widest bg-black/80 px-1">{label}</span>
        </motion.div>
    );
}

function DataPacket({ angle, delay }: { angle: number, delay: number }) {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                transform: [
                    `rotate(${angle}deg) translate(140px) rotate(-${angle}deg)`, // Start at Node
                    `rotate(${angle}deg) translate(0px) rotate(-${angle}deg)` // End at Center
                ]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
                ease: "linear" // "In" speed?
            }}
        />
    )
}
