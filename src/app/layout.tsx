import type { Metadata } from 'next';
import { Inter, Poppins, Lato } from 'next/font/google'; // Import Poppins and Lato
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Keep Inter as sans-serif fallback
});

// Configure Poppins for headings
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Include needed weights
  variable: '--font-heading',
});

// Configure Lato for body text
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'], // Include needed weights
  variable: '--font-body',
});


export const metadata: Metadata = {
  title: 'Persona Canvas - Portfolio',
  description: 'A modern, animated personal portfolio showcasing skills and projects.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${lato.variable} dark`}> {/* Add font variables */}
      {/* Added relative positioning and overflow-x-hidden to body */}
      <body className={`font-body antialiased relative overflow-x-hidden`}> {/* Apply Lato font variable as default body font */}
         {/* Background Container */}
        <div
          className="fixed inset-0 z-[-1] bg-background bg-cover bg-center bg-fixed opacity-15"
          style={{ backgroundImage: "url('https://picsum.photos/seed/vlsi-bg/1920/1080')" }}
          data-ai-hint="abstract vlsi circuit background"
        ></div>
        {/* Optional Texture Overlay */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03] bg-[url('/assets/noise.png')] bg-repeat"></div>

        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
