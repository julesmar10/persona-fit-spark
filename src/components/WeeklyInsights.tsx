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
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Award className="w-6 h-6 text-secondary" />
              This Week's Insights
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Personalized patterns from your activity
            </p>
          </div>
          <Badge variant="secondary" className="gap-2">
            <Zap className="w-3 h-3" />
            AI Analysis
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card
            key={index}
            className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="space-y-3">
              <div className={`w-12 h-12 rounded-xl ${insight.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <insight.icon className={`w-6 h-6 ${insight.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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
