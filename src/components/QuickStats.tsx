import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Trophy, Heart } from "lucide-react";

const QuickStats = () => {
  const stats = [
    {
      label: "Calories Burned",
      value: "2,847",
      change: "+18%",
      icon: Zap,
      color: "text-coral",
      bgColor: "bg-coral/10",
      gradient: "from-coral to-secondary",
    },
    {
      label: "Active Minutes",
      value: "487",
      change: "+12%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-mint/10",
      gradient: "from-mint to-primary",
    },
    {
      label: "Workouts",
      value: "47",
      change: "+5",
      icon: Trophy,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      gradient: "from-secondary to-coral",
    },
    {
      label: "Avg Heart Rate",
      value: "142",
      change: "BPM",
      icon: Heart,
      color: "text-accent",
      bgColor: "bg-lavender/10",
      gradient: "from-lavender to-accent",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      {stats.map((stat, index) => (
        <Card
          key={stat.label}
          className="relative group overflow-hidden border-border/30 hover-lift cursor-pointer"
          style={{
            animationDelay: `${index * 0.05}s`,
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {/* Gradient background on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          <div className="relative p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            
            <div>
              <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
