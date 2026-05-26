import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Ginho AI • Premium Developer Automation Portal',
  description: 'Automate repetitive coding tasks, monitor developer efficiency metrics, share configuration files, and manage premium team workflows with deep intelligence models.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#F8FAFC] text-[#1E293B] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
