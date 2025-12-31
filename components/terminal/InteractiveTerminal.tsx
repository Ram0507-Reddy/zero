'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal } from 'lucide-react';

export default function InteractiveTerminal() {
    const router = useRouter();
    const [history, setHistory] = useState([
        { type: 'output', content: 'ZERO [Version 1.0.4]' },
        { type: 'output', content: '(c) 2025 Zero Inc. All rights reserved.' },
        { type: 'output', content: '' },
        { type: 'output', content: 'Type "help" for a list of commands.' },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', content: input }];

            let response = '';

            switch (cmd) {
                case 'help':
                    response = 'AVAILABLE COMMANDS:\n  help        - Show this list\n  status      - Check system status\n  deploy      - Simulate deployment\n  contact     - Open secure communication channel\n  suite       - View ZERO Suite\n  ghost       - View Ghost Protocol\n  about       - About the company\n  clear       - Clear terminal';
                    break;
                case 'status':
                    response = 'SYSTEM STATUS: OPERATIONAL\nENCRYPTION: AES-256-GCM\nNODES: ACTIVE\nCOOKIES: NONE DETECTED\nTRACKERS: BLOCKED';
                    break;
                case 'contact':
                    response = 'Initiating handshake protocol... Redirecting to secure channel.';
                    setTimeout(() => router.push('/contact'), 1000);
                    break;
                case 'suite':
                    response = 'Loading Product Suite module...';
                    setTimeout(() => router.push('/suite'), 800);
                    break;
                case 'ghost':
                    response = 'Accessing restricted archives...';
                    setTimeout(() => router.push('/ghost'), 800);
                    break;
                case 'about':
                    response = 'Retrieving company dossier...';
                    setTimeout(() => router.push('/about'), 800);
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'deploy':
                    // Simulate deployment steps then do nothing or just show it
                    newHistory.push({ type: 'output', content: 'Initalizing container orchestration...' });
                    setHistory(newHistory);
                    setInput('');

                    const deploymentSteps = [
                        'Pulling image: zero/core:latest...',
                        'Verifying PGP signatures... [OK]',
                        'Allocating resources... 4 vCPU / 8GB RAM',
                        'Establishing secure sockets...',
                        'DEPLOYMENT SUCCESSFUL. Instance ID: ax-9928-secure'
                    ];

                    let step = 0;
                    const interval = setInterval(() => {
                        if (step < deploymentSteps.length) {
                            setHistory(prev => [...prev, { type: 'output', content: deploymentSteps[step] }]);
                            step++;
                        } else {
                            clearInterval(interval);
                        }
                    }, 600);
                    return;
                case '':
                    response = '';
                    break;
                default:
                    response = `Command '${cmd}' not recognized.`;
            }

            if (response) {
                newHistory.push({ type: 'output', content: response });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div className="bg-[#050505] rounded-xl border border-white/10 p-1 font-mono text-sm overflow-hidden mb-24 relative shadow-2xl shadow-black/50 transition-colors duration-300 h-96 flex flex-col group hover:border-white/20">
            <div className="absolute top-0 left-0 right-0 h-10 bg-[#111111] flex items-center px-4 justify-between border-b border-white/5 z-10">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#444] font-bold tracking-widest uppercase">
                    <Terminal size={10} /> ZERO_SECURE_SHELL
                </div>
                <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            <div className="mt-10 p-4 md:p-6 flex-1 overflow-y-auto space-y-2 text-[#888] scrollbar-hide font-mono leading-relaxed">
                {history.map((line, i) => (
                    <div key={i} className={`${line.type === 'input' ? 'text-[var(--text-main)]' : 'whitespace-pre-wrap'}`}>
                        {line.type === 'input' ? `> ${line.content}` : line.content}
                    </div>
                ))}

                <div className="flex items-center text-[var(--text-main)]">
                    <span className="mr-2 text-zero-green">{'>'}</span>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="bg-transparent border-none outline-none flex-1 font-mono text-sm caret-zero-green"
                        autoFocus
                        placeholder="Type 'help'..."
                    />
                </div>
                <div ref={bottomRef}></div>
            </div>
        </div>
    );
}
