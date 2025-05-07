'use client';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface FeaturedSkillsSummaryProps {
  skills?: string[];
}

const FeaturedSkillsSummary: React.FC<FeaturedSkillsSummaryProps> = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return (
      <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Lightbulb className="mr-2 h-5 w-5" /> Key Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No skills to display yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" /> Key Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedSkillsSummary;
