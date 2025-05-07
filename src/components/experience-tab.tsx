
'use client';

import type React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react"; // Import icons
import { Badge } from "./ui/badge";
import type { PortfolioData, Experience, Education } from '@/lib/types';

interface ExperienceSectionProps {
  portfolioData: PortfolioData;
}

export default function ExperienceSection({ portfolioData }: ExperienceSectionProps) {
  const experiences: Experience[] = portfolioData?.experience || [];
  const education: Education[] = portfolioData?.education || [];

  const timelineItems = [
    ...experiences.map(item => ({ ...item, type: 'experience' as const })),
    ...education.map(item => ({ ...item, type: 'education' as const })),
  ].sort((a, b) => {
    // Sort primarily by end date (ongoing first), then by start date
    const getYear = (item: Experience | Education) => {
      if (item.type === 'experience') return item.duration.split(' - ')[1] || new Date().getFullYear().toString();
      return item.graduationYear;
    };
    const endYearA = getYear(a);
    const endYearB = getYear(b);
    if (endYearA === 'Ongoing' && endYearB !== 'Ongoing') return -1;
    if (endYearA !== 'Ongoing' && endYearB === 'Ongoing') return 1;
    if (endYearA !== 'Ongoing' && endYearB !== 'Ongoing') {
       const yearDiff = parseInt(endYearB) - parseInt(endYearA);
       if (yearDiff !== 0) return yearDiff;
    }
    // Add secondary sort by start date/year if needed
    return 0; // Basic sort for now
  });


  return (
    <div className="w-full max-w-4xl mx-auto relative pl-8 md:pl-12">
      {/* Vertical Timeline Line */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-border/50"></div>

      {timelineItems.length > 0 ? (
        <div className="space-y-12">
          {timelineItems.map((item, index) => (
            <div
              key={`${item.type}-${item.id}`}
              className="relative animate-fade-in-up"
               style={{ animationDelay: `${0.1 + index * 0.15}s`, animationFillMode: 'backwards' }}
            >
               {/* Timeline Dot */}
               <div className="absolute left-[-1.1rem] md:left-[-1.6rem] top-1 h-4 w-4 rounded-full bg-primary border-2 border-background ring-2 ring-primary/50"></div>

                {item.type === 'experience' ? (
                    // Work Experience Card
                    <div className="bg-card/60 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                            <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                             <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                               <Calendar className="h-4 w-4"/>
                               <span>{item.duration}</span>
                             </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 text-muted-foreground gap-2">
                            <p className="font-medium flex items-center gap-1"><Briefcase className="h-4 w-4"/> {item.company}</p>
                            {item.location && <p className="text-sm flex items-center gap-1"><MapPin className="h-4 w-4"/> {item.location}</p>}
                        </div>
                        <div className="mb-4 text-base leading-relaxed text-muted-foreground">
                            {item.description.includes('.') ? (
                                <ul className="list-disc list-outside space-y-1 pl-5">
                                    {item.description.split('. ').filter(s => s.trim()).map((point, i) => (
                                        <li key={i}>{point.trim()}{item.description.includes('.') && i < item.description.split('. ').filter(s => s.trim()).length - 1 ? '.' : ''}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{item.description}</p> // Render as paragraph if no periods
                            )}
                        </div>
                        {item.skills && item.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {item.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="transition-transform duration-200 hover:scale-105 text-sm px-3 py-1">{skill}</Badge>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    // Education Card
                     <div className="bg-card/60 backdrop-blur-sm p-6 rounded-lg border border-border/50 shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-2">
                             <h3 className="text-xl font-semibold text-foreground">{item.degree}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground flex-shrink-0">
                               <Calendar className="h-4 w-4"/>
                               <span>Graduated: {item.graduationYear}</span>
                              </div>
                         </div>
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 text-muted-foreground gap-2">
                             <p className="font-medium flex items-center gap-1"><GraduationCap className="h-4 w-4"/> {item.institution}</p>
                            {item.location && <p className="text-sm flex items-center gap-1"><MapPin className="h-4 w-4"/> {item.location}</p>}
                         </div>
                         <p className="text-base leading-relaxed font-medium text-foreground">Aggregate: <Badge variant="outline">{item.aggregate}</Badge></p>
                     </div>
                )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-4">No experience or education available.</p>
      )}
    </div>
  );
}
