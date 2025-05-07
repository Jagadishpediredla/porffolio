'use client';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Experience } from '@/lib/types';
import { Briefcase, Calendar } from 'lucide-react';

interface RecentExperienceSummaryProps {
  experience?: Experience;
}

const RecentExperienceSummary: React.FC<RecentExperienceSummaryProps> = ({ experience }) => {
  if (!experience) {
    return (
     <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Briefcase className="mr-2 h-5 w-5" /> Recent Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent experience to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <Briefcase className="mr-2 h-5 w-5" /> Recent Role
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <h3 className="text-lg font-medium text-foreground text-left mb-1">{experience.title}</h3>
        <p className="text-sm text-muted-foreground mb-1 text-left">{experience.company}</p> {/* Added text-left */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground/80 mt-1 mb-2">
          <Calendar className="h-3.5 w-3.5" />
          <span>{experience.duration}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-grow">
          {experience.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default RecentExperienceSummary;
