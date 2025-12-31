import '../styles/globals.css'
import Nav from '@/components/navigation/Nav'
import ClientLayout from '@/components/ClientLayout'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

// v3.0 Forced Update - Cache Buster
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
