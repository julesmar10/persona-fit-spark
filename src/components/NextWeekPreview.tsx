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
      <Card className="border-border/50 overflow-hidden hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="bg-gradient-card p-8 border-b border-border/50">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-3">
                <Calendar className="w-8 h-8 text-primary" />
                Next Week Preview
              </h2>
              <p className="text-base text-muted-foreground">
                Your adaptive plan continues to evolve with you
              </p>
            </div>
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <TrendingUp className="w-4 h-4" />
              Optimized
            </Badge>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-8">
            {nextWeekHighlights.map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-5 rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift group bg-background/50"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors text-base">
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
                  className="px-4 py-1"
                >
                  {workout.intensity}
                </Badge>
              </div>
            ))}
          </div>

          <div className="bg-lavender/10 border-2 border-lavender/30 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-lavender/20 flex items-center justify-center shrink-0" style={{ boxShadow: "var(--shadow-soft)" }}>
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2 text-lg">Progressive Challenge</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Based on this week's performance, I'm increasing your workout duration by 5 minutes 
                  and introducing new exercises to keep you engaged.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="default" className="flex-1 gap-2 h-12">
              View Full Schedule
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="h-12 px-6">
              Adjust Preferences
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default NextWeekPreview;
