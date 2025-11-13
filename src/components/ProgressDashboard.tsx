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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Your Progress
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track your journey and celebrate milestones
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Completion Ring */}
        <Card className="p-6 border-border/50 col-span-1">
          <div className="text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="url(#progress-gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(4/5) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-foreground">4/5</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-2">Weekly Goal Progress</p>
              <div className="flex justify-center gap-1">
                {weeklyProgress.map((day, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                      day.completed
                        ? "bg-primary text-primary-foreground"
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
        <Card className="p-6 border-border/50 col-span-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              <h3 className="font-semibold text-foreground">Achievements</h3>
            </div>
            <Badge variant="secondary">3/6 Unlocked</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  badge.earned
                    ? "border-primary bg-primary/5 hover:border-primary/70"
                    : "border-border bg-muted/30 opacity-60"
                }`}
              >
                <div className="text-center space-y-2">
                  <div className={`text-3xl ${badge.earned ? "animate-pulse-glow" : "grayscale"}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  </div>
                  {badge.earned && (
                    <div className="flex items-center justify-center gap-1 text-xs text-primary">
                      <Star className="w-3 h-3 fill-primary" />
                      <span>Earned!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Summary */}
        <Card className="p-6 border-border/50 col-span-1 lg:col-span-3">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Overall Progress
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Workouts</span>
                <span className="font-semibold text-foreground">47 / 60</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calories Burned</span>
                <span className="font-semibold text-foreground">12.4k / 15k</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Active Days</span>
                <span className="font-semibold text-foreground">32 / 42</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProgressDashboard;
