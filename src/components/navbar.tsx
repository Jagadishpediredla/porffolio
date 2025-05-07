
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Using next/link for potential prefetching benefits
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu toggle

interface NavbarProps {
  sectionIds: { [key: string]: string };
}

const Navbar: React.FC<NavbarProps> = ({ sectionIds }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Add background after scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset based on navbar height (adjust if navbar height changes)
      const navbarHeight = 64; // Example height in pixels
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
     setIsMobileMenuOpen(false); // Close mobile menu on link click
  };

  const navLinks = [
    { label: 'Home', id: sectionIds.home },
    { label: 'About', id: sectionIds.about },
    { label: 'Skills', id: sectionIds.skills },
    { label: 'Experience', id: sectionIds.experience },
    { label: 'Projects', id: sectionIds.projects },
    { label: 'Certs', id: sectionIds.certifications }, // Shortened label for mobile
    { label: 'Achievements', id: sectionIds.achievements },
    { label: 'Contact', id: sectionIds.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <Link href={`#${sectionIds.home}`} onClick={(e) => handleScrollTo(sectionIds.home, e)} className="text-2xl font-bold text-primary font-heading">
              {/* Replace with initials, logo, or full name */}
              VJP
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(link.id, e)}
                  className="text-foreground/80 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
               className="text-foreground/80 hover:text-primary"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md shadow-xl pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(link.id, e)}
                className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 w-full text-center"
              >
                 {/* Use full label for mobile if space allows, otherwise keep short */}
                {link.label === 'Certs' ? 'Certifications' : link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
