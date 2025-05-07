'use client';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Certification } from '@/lib/types';
import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';

interface KeyCertificationsSummaryProps {
  certification?: Certification;
}

const KeyCertificationsSummary: React.FC<KeyCertificationsSummaryProps> = ({ certification }) => {
  if (!certification) {
    return (
      <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <BadgeCheck className="mr-2 h-5 w-5" /> Key Certification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No key certification to display.</p>
        </CardContent>
      </Card>
    );
  }

  const issuerLogos: { [key: string]: string } = {
    "Infosys": "/assets/logos/infosys.png",
    "NIELIT": "/assets/logos/nielit.png",
    "APSSDC": "/assets/logos/apssdc.png",
    "NPTEL": "/assets/logos/nptel.png",
    "Texas Instruments": "/assets/logos/ti.png",
  };

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <BadgeCheck className="mr-2 h-5 w-5" /> Key Certification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          {issuerLogos[certification.issuer] && (
            <div className="flex-shrink-0 h-10 w-10 relative bg-white rounded-md p-1.5 mr-3 shadow-sm">
              <Image
                src={issuerLogos[certification.issuer]}
                alt={`${certification.issuer} logo`}
                fill
                sizes="40px"
                style={{ objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">{certification.title}</h3>
            <p className="text-sm text-muted-foreground">{certification.issuer}</p>
          </div>
        </div>
        {certification.date && <p className="text-xs text-muted-foreground/80 mb-1">{certification.date}</p>}
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {certification.description || "Awarded for demonstrating expertise in the respective field."}
        </p>
      </CardContent>
    </Card>
  );
};

export default KeyCertificationsSummary;
