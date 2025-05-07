
'use client';

 import type React from 'react';
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { ExternalLink, FolderArchive } from "lucide-react"; // Added FolderArchive for category icon
 import Link from "next/link";
 import Image from "next/image";
 import { Badge } from "./ui/badge";
 import { certificationsData as certs } from '@/lib/certifications-data'; 
 import type { PortfolioData, Certification } from '@/lib/types';

interface CertificationsTabProps {
  portfolioData?: PortfolioData; 
}

export default function CertificationsTab({ portfolioData }: CertificationsTabProps) {
  const certifications: Certification[] = certs;

  // Group certifications by category
  const groupedCertifications = certifications.reduce((acc, cert) => {
    const category = cert.category || "Other"; // Default category if none provided
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(cert);
    return acc;
  }, {} as Record<string, Certification[]>);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-10">
      {Object.entries(groupedCertifications).length > 0 ? (
        Object.entries(groupedCertifications).map(([category, certsInCategory], categoryIndex) => (
          <section key={category} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + categoryIndex * 0.2}s`, animationFillMode: 'backwards' }}>
            <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
              <FolderArchive className="mr-3 h-6 w-6" />
              {category}
            </h3>
            {certsInCategory.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {certsInCategory.map((item, index) => (
                  <AccordionItem
                    value={`item-${item.id}`}
                    key={item.id}
                    className="border border-border/50 rounded-lg overflow-hidden shadow-sm hover:border-primary/50 hover:shadow-primary/15 transition-all duration-300 bg-card/80 backdrop-blur-sm animate-fade-in-up group"
                    style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-medium hover:no-underline hover:bg-muted/50 transition-colors duration-200 [&[data-state=open]>svg]:text-primary [&[data-state=open]>svg]:rotate-180">
                      <div className="flex justify-between items-center w-full pr-4">
                        <span className="font-semibold text-foreground text-lg">{item.title}</span>
                        {item.issuer && ( // Display issuer instead of date
                          <span className="text-sm text-muted-foreground hidden sm:block flex-shrink-0">{item.issuer}</span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2 text-base text-muted-foreground bg-muted/30">
                      {/* Issuer is now in trigger, date can be shown here if needed, or removed */}
                      {item.date && <p className="mb-1 text-xs text-muted-foreground/80">Date: {item.date}</p>}
                      {item.description && <p className="mb-4 leading-relaxed">{item.description}</p>}
                      
                      <div className="my-5 relative h-72 md:h-80 w-full overflow-hidden rounded-md border border-border/30 bg-muted/10 flex items-center justify-center">
                        <Image
                          src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/300`}
                          alt={`Certificate for ${item.title}`}
                          fill
                          style={{ objectFit: 'contain' }}
                          data-ai-hint={`certificate ${item.issuer || ''}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                          priority={index < 3}
                        />
                      </div>

                      {item.skills && item.skills.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-foreground/90 mb-2">Skills Covered:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map(skill => (
                              <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.link && item.link !== "#" && (
                        <Link href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline text-sm font-medium group btn-textured py-1 px-3 rounded">
                          View Credential <ExternalLink className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                      )}
                      {(!item.link || item.link === "#") && (
                        <p className="text-xs text-muted-foreground/70 italic">Credential link not available.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground text-center py-4">No certifications in this category.</p>
            )}
          </section>
        ))
      ) : (
        <p className="text-muted-foreground text-center py-4">No certifications available.</p>
      )}
    </div>
  );
}
