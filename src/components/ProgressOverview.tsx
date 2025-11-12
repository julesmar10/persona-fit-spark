import { TrendingUp, Flame, Target, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressOverview = () => {
  const stats = [
    { icon: Flame, label: "Streak", value: "12 days", color: "text-secondary", progress: 75 },
    { icon: Target, label: "Weekly Goal", value: "4/5 workouts", color: "text-primary", progress: 80 },
    { icon: TrendingUp, label: "Improvement", value: "+15%", color: "text-accent", progress: 65 },
    { icon: Trophy, label: "Achievements", value: "8 unlocked", color: "text-secondary", progress: 60 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
          <Progress value={stat.progress} className="h-1.5" />
        </Card>
      ))}
    </div>
  );
};

export default ProgressOverview;
