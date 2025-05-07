
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  sectionIds: { [key: string]: string };
  onNavLinkClick: (id: string) => void; // Prop to handle view switching
  activeSectionId: string; // Prop to know the current active section
}

const Navbar: React.FC<NavbarProps> = ({ sectionIds, onNavLinkClick, activeSectionId }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar background change on scroll is less relevant if it's always fixed and views switch
      // However, keeping it in case user scrolls within a very long single view (like Home if it becomes complex)
      setIsScrolled(window.scrollY > 20); 
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavAction = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    onNavLinkClick(id);     // Call the parent function to switch views
    setIsMobileMenuOpen(false); // Close mobile menu on link click
  };

  const navLinks = [
    { label: 'Home', id: sectionIds.home },
    { label: 'About', id: sectionIds.about },
    { label: 'Skills', id: sectionIds.skills },
    { label: 'Experience', id: sectionIds.experience },
    { label: 'Projects', id: sectionIds.projects },
    { label: 'Certs', id: sectionIds.certifications, fullLabel: 'Certifications' },
    { label: 'Achievements', id: sectionIds.achievements },
    { label: 'Contact', id: sectionIds.contact },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMobileMenuOpen ? 'bg-background/95 backdrop-blur-lg shadow-xl' : 'bg-background/80 backdrop-blur-md shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16"> {/* Fixed height for navbar */}
          <div className="flex-shrink-0">
            <Link href={`#${sectionIds.home}`} onClick={(e) => handleNavAction(sectionIds.home, e)} className="text-2xl font-bold text-primary font-heading hover:opacity-80 transition-opacity">
              VJP
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`} // Keep href for semantics/SEO/fallback
                  onClick={(e) => handleNavAction(link.id, e)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/10
                    ${activeSectionId === link.id 
                      ? 'text-primary bg-primary/10 font-semibold' 
                      : 'text-foreground/80'
                    }`}
                  aria-current={activeSectionId === link.id ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

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

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl shadow-2xl pb-4 border-t border-border/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavAction(link.id, e)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 w-full text-center hover:text-primary hover:bg-primary/10
                  ${activeSectionId === link.id 
                    ? 'text-primary bg-primary/10 font-semibold' 
                    : 'text-foreground/80'
                  }`}
                aria-current={activeSectionId === link.id ? 'page' : undefined}
              >
                {link.fullLabel || link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
