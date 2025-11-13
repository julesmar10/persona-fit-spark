import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award, Star, TrendingUp, Calendar, Target } from "lucide-react";

const ProgressDashboard = () => {
  const weeklyProgress = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: true },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const badges = [
    { id: 1, name: "Early Bird", icon: "🌅", earned: true, description: "5 morning workouts" },
    { id: 2, name: "Consistency Champ", icon: "🔥", earned: true, description: "12-day streak" },
    { id: 3, name: "Strength Builder", icon: "💪", earned: true, description: "20 strength sessions" },
    { id: 4, name: "Cardio King", icon: "🏃", earned: false, description: "Complete 30 cardio workouts" },
    { id: 5, name: "Recovery Master", icon: "🧘", earned: false, description: "15 recovery sessions" },
    { id: 6, name: "Month Champion", icon: "👑", earned: false, description: "30-day streak" },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-primary" />
          Your Progress
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Track your journey and celebrate milestones
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Completion Ring */}
        <Card className="p-8 border-border/50 col-span-1 hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="text-center space-y-5">
            <div className="relative w-36 h-36 mx-auto">
              <svg className="transform -rotate-90 w-36 h-36">
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="64"
                  stroke="url(#progress-gradient)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={`${(4/5) * 2 * Math.PI * 64} ${2 * Math.PI * 64}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 animate-glow"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-foreground">4/5</p>
                <p className="text-sm text-muted-foreground mt-1">This Week</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-foreground mb-3 text-lg">Weekly Goal Progress</p>
              <div className="flex justify-center gap-2">
                {weeklyProgress.map((day, index) => (
                  <div
                    key={index}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      day.completed
                        ? "bg-primary text-primary-foreground hover-lift"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day.completed ? "✓" : day.day.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements Grid */}
        <Card className="p-8 border-border/50 col-span-1 lg:col-span-2 hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-secondary" />
              <h3 className="font-bold text-foreground text-lg">Achievements</h3>
            </div>
            <Badge variant="secondary" className="px-4 py-1">3/6 Unlocked</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                  badge.earned
                    ? "border-primary bg-primary/10 hover:border-primary/70 hover-lift"
                    : "border-border bg-muted/30 opacity-60"
                }`}
                style={badge.earned ? { boxShadow: "var(--shadow-soft)" } : undefined}
              >
                <div className="text-center space-y-3">
                  <div className={`text-4xl ${badge.earned ? "animate-float" : "grayscale"}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{badge.description}</p>
                  </div>
                  {badge.earned && (
                    <div className="flex items-center justify-center gap-1 text-xs text-primary font-semibold">
                      <Star className="w-3.5 h-3.5 fill-primary" />
                      <span>Earned!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Summary */}
        <Card className="p-8 border-border/50 col-span-1 lg:col-span-3 hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
          <h3 className="font-bold text-foreground mb-6 flex items-center gap-3 text-lg">
            <Target className="w-6 h-6 text-accent" />
            Overall Progress
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Total Workouts</span>
                <span className="font-bold text-foreground">47 / 60</span>
              </div>
              <Progress value={78} className="h-2.5" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Calories Burned</span>
                <span className="font-bold text-foreground">12.4k / 15k</span>
              </div>
              <Progress value={83} className="h-2.5" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-base">
                <span className="text-muted-foreground">Active Days</span>
                <span className="font-bold text-foreground">32 / 42</span>
              </div>
              <Progress value={76} className="h-2.5" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProgressDashboard;
