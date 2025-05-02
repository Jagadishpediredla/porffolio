'use client';

import type React from 'react'; // Import type for React
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { portfolioData } from '@/lib/portfolio-data'; // Import hardcoded data
import type { Achievement } from '@/lib/types'; // Import type

export default function AchievementsTab() {
  const achievements: Achievement[] = portfolioData.achievements; // Use hardcoded data

  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-auto animate-fade-in"> {/* Ensure overflow is handled */}
      <CardHeader className="sticky top-0 bg-card z-10"> {/* Make header sticky if needed */}
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <Award className="h-6 w-6 text-primary"/>
           Achievements & Recognition
        </CardTitle>
         <CardDescription>Highlighting key accomplishments and milestones.</CardDescription>
      </CardHeader>
      <CardContent>
        {achievements.length > 0 ? (
            <ul className="space-y-6">
            {achievements.map((achievement, index) => (
                <li
                key={achievement.id}
                className="flex items-start space-x-4 p-4 rounded-lg border border-transparent hover:border-primary/30 hover:bg-muted/50 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'backwards' }}
                >
                <span className="flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                    <Star className="h-5 w-5 text-primary" />
                </span>
                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200">{achievement.title}</h3>
                        {achievement.type && <Badge variant="outline" className="mt-1 sm:mt-0 transition-colors duration-200 group-hover:border-primary group-hover:text-primary">{achievement.type}</Badge>}
                    </div>
                    {achievement.description && <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>}
                    {achievement.date && <p className="text-xs text-muted-foreground/80">{achievement.date}</p>}
                </div>
                </li>
            ))}
            </ul>
        ) : (
            <p className="text-muted-foreground text-center py-4">No achievements available.</p>
        )}
      </CardContent>
    </Card>
  );
}
