'use client';
import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Achievement } from '@/lib/types';
import { Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface NotableAchievementsSummaryProps {
  achievement?: Achievement;
}

const NotableAchievementsSummary: React.FC<NotableAchievementsSummaryProps> = ({ achievement }) => {
  if (!achievement) {
    return (
     <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary flex items-center">
            <Star className="mr-2 h-5 w-5" /> Notable Achievement
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">No notable achievements to display.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    // Ensure the card takes full height within the grid cell
    <Card className="h-full flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-primary/20 hover:border-primary/60 transition-all duration-300 hover-lift group">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary flex items-center">
          <Star className="mr-2 h-5 w-5" /> Notable Achievement
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col"> {/* Added flex-grow and flex-col */}
        <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">{achievement.title}</h3>
        <div className="flex justify-between items-center mt-1 mb-2 flex-wrap gap-x-2"> {/* Added flex-wrap and gap */}
            {achievement.type && <Badge variant="outline" className="text-xs flex-shrink-0">{achievement.type}</Badge>}
            {achievement.date && <p className="text-xs text-muted-foreground/80 flex-shrink-0">{achievement.date}</p>}
        </div>
        {/* Ensure description takes remaining space */}
        <p className="text-sm text-muted-foreground mt-1 line-clamp-3 flex-grow">
          {achievement.description || "A significant accomplishment reflecting dedication and skill."}
        </p>
      </CardContent>
    </Card>
  );
};

export default NotableAchievementsSummary;
