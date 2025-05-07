
'use client';

import type React from 'react';
import { Star } from "lucide-react"; // Removed Award
import { Badge } from "./ui/badge";
import type { PortfolioData, Achievement } from '@/lib/types';

interface AchievementsSectionProps {
  portfolioData: PortfolioData;
}

export default function AchievementsSection({ portfolioData }: AchievementsSectionProps) {
  const achievements: Achievement[] = portfolioData?.achievements || [];

  return (
    <div className="w-full max-w-4xl mx-auto">
        {achievements.length > 0 ? (
            <ul className="space-y-6">
            {achievements.map((achievement, index) => (
                <li
                key={achievement.id}
                // Added hover effect classes
                className="flex items-start space-x-4 p-5 rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm shadow-md hover:border-primary/50 hover:shadow-primary/15 transition-all duration-300 group animate-fade-in-up"
                style={{ animationDelay: `${0.1 + index * 0.15}s`, animationFillMode: 'backwards' }}
                >
                <span className="flex-shrink-0 mt-1.5 p-2 bg-primary/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                    <Star className="h-5 w-5 text-primary" />
                </span>
                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1.5">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">{achievement.title}</h3>
                        {achievement.type && <Badge variant="outline" className="mt-1 sm:mt-0 transition-colors duration-200 group-hover:border-primary group-hover:text-primary text-xs">{achievement.type}</Badge>}
                    </div>
                    {achievement.description && <p className="text-muted-foreground text-base mb-2 leading-relaxed">{achievement.description}</p>}
                    {achievement.date && <p className="text-xs text-muted-foreground/80">{achievement.date}</p>}
                </div>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-muted-foreground text-center py-4">No achievements available.</p>
        )}
      </div>
  );
}
