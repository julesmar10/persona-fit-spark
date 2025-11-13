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
    <section className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Your Progress Snapshot</h2>
        <p className="text-base text-muted-foreground mt-2">
          Real-time insights into your fitness journey
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
      <Card
        key={index}
        className={`p-8 border-border/50 hover:border-mint/50 transition-all duration-300 group relative overflow-hidden ${
          stat.isStreak && streakFlare ? "streak-flare" : ""
        }`}
        style={{ 
          animationDelay: `${index * 0.1}s`,
          boxShadow: "var(--shadow-card)"
        }}
        onClick={stat.isStreak ? handleStreakClick : undefined}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-mint/5 to-primary/10" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 h-8 w-8 z-10 ${
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

        <div className="relative flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-card flex items-center justify-center group-hover:scale-110 transition-transform relative ${
              stat.isStreak ? "cursor-pointer" : ""
            }`} style={{ boxShadow: "var(--shadow-soft)" }}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              {stat.isStreak && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <Progress value={stat.progress} className="h-2" />
          <div 
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary/20 to-transparent rounded-full animate-shimmer"
            style={{ width: `${stat.progress}%` }}
          />
        </div>
      </Card>
        ))}
      </div>
    </section>
  );
};

export default ProgressOverview;
