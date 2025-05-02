import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed font to Inter for better readability
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Define CSS variable
});

export const metadata: Metadata = {
  title: 'Persona Canvas - Portfolio', // Updated title
  description: 'A modern, animated personal portfolio.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}> {/* Apply font variable and dark theme */}
      <body className={`font-sans antialiased`}> {/* Apply font-sans utility class */}
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
