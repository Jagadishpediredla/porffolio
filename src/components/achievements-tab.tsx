import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star } from "lucide-react";
import { Badge } from "./ui/badge";

const achievements = [
  {
    id: 1,
    title: "Open Source Contributor",
    description: "Actively contributed to the 'Awesome-Framework' project, merging 15+ pull requests focused on performance improvements.",
    date: "2023",
    type: "Contribution",
  },
  {
    id: 2,
    title: "Hackathon Winner - 1st Place",
    description: "Led a team of 4 to win the 'InnovateAI' Hackathon by developing a novel AI-powered recommendation engine.",
    date: "Oct 2022",
    type: "Competition",
  },
  {
    id: 3,
    title: "Published Technical Article",
    description: "Authored an article on 'Advanced State Management in React' published on a major tech blog, reaching 50k+ readers.",
    date: "July 2022",
    type: "Publication",
  },
  {
    id: 4,
    title: "Employee of the Quarter",
    description: "Recognized for outstanding performance and contributions to the team's success at Tech Innovations Inc.",
    date: "Q3 2021",
    type: "Recognition",
  },
];

export default function AchievementsTab() {
  return (
    <Card className="w-full bg-card border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
           <Award className="h-6 w-6 text-primary"/>
           Achievements & Recognition
        </CardTitle>
         <CardDescription>Highlighting key accomplishments and milestones.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {achievements.map((achievement) => (
            <li key={achievement.id} className="flex items-start space-x-4 p-4 rounded-lg border border-transparent hover:border-primary/30 hover:bg-muted/50 transition-all duration-300">
              <span className="flex-shrink-0 mt-1">
                <Star className="h-5 w-5 text-primary" />
              </span>
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                    <h3 className="font-semibold text-lg text-foreground">{achievement.title}</h3>
                    <Badge variant="outline" className="mt-1 sm:mt-0">{achievement.type}</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                <p className="text-xs text-muted-foreground/80">{achievement.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
