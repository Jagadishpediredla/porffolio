import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Changed font to Inter for better readability
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' }); // Use Inter font

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
    <html lang="en" className="dark"> {/* Apply dark theme globally */}
      <body className={`${inter.variable} font-sans antialiased`}> {/* Use Inter font */}
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
