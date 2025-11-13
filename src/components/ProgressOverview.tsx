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
        className="p-8 border-border/50 hover:border-mint/50 transition-all duration-300 group hover:animate-lift"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          boxShadow: "var(--shadow-card)"
        }}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform" style={{ boxShadow: "var(--shadow-soft)" }}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
        <Progress value={stat.progress} className="h-2" />
      </Card>
      ))}
    </div>
  );
};

export default ProgressOverview;
