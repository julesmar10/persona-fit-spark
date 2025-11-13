import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar, TrendingUp, Target } from "lucide-react";

const NextWeekPreview = () => {
  const nextWeekHighlights = [
    { day: "Monday", focus: "Upper Body Strength", intensity: "Medium" },
    { day: "Wednesday", focus: "HIIT Cardio Blast", intensity: "High" },
    { day: "Friday", focus: "Full Body Circuit", intensity: "High" },
    { day: "Sunday", focus: "Active Recovery", intensity: "Low" },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <Card className="border-border/50 overflow-hidden">
        <div className="bg-gradient-card p-6 border-b border-border/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
                <Calendar className="w-6 h-6 text-primary" />
                Next Week Preview
              </h2>
              <p className="text-sm text-muted-foreground">
                Your adaptive plan continues to evolve with you
              </p>
            </div>
            <Badge variant="secondary" className="gap-2">
              <TrendingUp className="w-3 h-3" />
              Optimized
            </Badge>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3 mb-6">
            {nextWeekHighlights.map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {workout.day}
                    </p>
                    <p className="text-sm text-muted-foreground">{workout.focus}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    workout.intensity === "High"
                      ? "default"
                      : workout.intensity === "Medium"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {workout.intensity}
                </Badge>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">Progressive Challenge</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on this week's performance, I'm increasing your workout duration by 5 minutes 
                  and introducing new exercises to keep you engaged.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="default" className="flex-1 gap-2">
              View Full Schedule
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline">
              Adjust Preferences
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default NextWeekPreview;
