import { TrendingUp, Flame, Target, Trophy, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ProgressOverview = () => {
  const [savedStats, setSavedStats] = useState<Set<number>>(new Set());
  const [streakFlare, setStreakFlare] = useState(false);

  const stats = [
    { icon: Flame, label: "Streak", value: "12 days", color: "text-secondary", progress: 75, isStreak: true },
    { icon: Target, label: "Weekly Goal", value: "4/5 workouts", color: "text-primary", progress: 80 },
    { icon: TrendingUp, label: "Improvement", value: "+15%", color: "text-accent", progress: 65 },
    { icon: Trophy, label: "Achievements", value: "8 unlocked", color: "text-secondary", progress: 60 },
  ];

  const handleSave = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const newSaved = new Set(savedStats);
    if (newSaved.has(index)) {
      newSaved.delete(index);
      toast({
        title: "Removed from favorites",
        description: "This stat has been unsaved.",
      });
    } else {
      newSaved.add(index);
      toast({
        title: "❤️ Saved to favorites!",
        description: "You can view your saved stats anytime.",
      });
    }
    setSavedStats(newSaved);
  };

  const handleStreakClick = () => {
    setStreakFlare(true);
    toast({
      title: "🔥 Streak Power!",
      description: "You're on fire! Keep the momentum going!",
    });
    setTimeout(() => setStreakFlare(false), 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
      <Card
        key={index}
        className={`p-8 border-border/50 hover:border-mint/50 transition-all duration-300 group relative ${
          stat.isStreak && streakFlare ? "streak-flare" : ""
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
          boxShadow: "var(--shadow-card)"
        }}
        onClick={stat.isStreak ? handleStreakClick : undefined}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 ${
            savedStats.has(index) ? "save-pulse" : ""
          }`}
          onClick={(e) => handleSave(index, e)}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              savedStats.has(index)
                ? "fill-coral text-coral"
                : "text-muted-foreground hover:text-coral"
            }`}
          />
        </Button>

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform ${
              stat.isStreak ? "cursor-pointer" : ""
            }`} style={{ boxShadow: "var(--shadow-soft)" }}>
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
