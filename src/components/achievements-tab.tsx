'use client';

import type React from 'react'; // Import type for React
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { getPortfolioData, type Achievement } from '@/lib/firebase/database'; // Import function and type

export default function AchievementsTab() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPortfolioData();
        if (data && data.achievements) {
          // Convert Record<string, Achievement> to Achievement[]
          setAchievements(Object.values(data.achievements));
        } else {
          setAchievements([]); // Set empty if no data
          console.log("No achievements found in Firebase.");
        }
      } catch (err) {
        console.error("Error fetching achievements:", err);
        setError("An error occurred while fetching achievements.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="w-full bg-card border border-border shadow-lg overflow-hidden">
        <CardHeader>
          <Skeleton className="h-8 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, index) => ( // Render 3 skeleton items
            <li key={index} className="flex items-start space-x-4 p-4">
              <Skeleton className="h-5 w-5 rounded-full flex-shrink-0 mt-1" />
              <div className="flex-grow space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/4" />
              </div>
               <Skeleton className="h-6 w-20 rounded-full flex-shrink-0" />
            </li>
          ))}
        </CardContent>
      </Card>
    );
  }

   if (error) {
    return (
        <Card className="w-full bg-card border border-destructive shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
        );
    }

  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden animate-fade-in">
      <CardHeader>
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
