import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Zap, Award } from "lucide-react";

const WeeklyInsights = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "Peak Performance",
      description: "You're strongest on Wednesdays and Thursdays",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Calendar,
      title: "Best Time",
      description: "Morning workouts give you +15% better results",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Zap,
      title: "Energy Pattern",
      description: "You prefer high-intensity sessions early in the week",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Award className="w-8 h-8 text-secondary" />
              This Week's Insights
            </h2>
            <p className="text-base text-muted-foreground mt-2">
              Personalized patterns from your activity
            </p>
          </div>
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <Zap className="w-4 h-4" />
            AI Analysis
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card
            key={index}
            className="p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift glow-on-hover group"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div className="space-y-4">
              <div className={`w-14 h-14 rounded-2xl ${insight.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`} style={{ boxShadow: "var(--shadow-soft)" }}>
                <insight.icon className={`w-7 h-7 ${insight.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2 text-lg">{insight.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WeeklyInsights;
