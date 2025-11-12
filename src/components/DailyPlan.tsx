import { Clock, Zap, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DailyPlan = () => {
  const workouts = [
    {
      id: 1,
      title: "Morning HIIT",
      duration: "25 min",
      intensity: "High",
      completed: true,
      description: "Explosive cardio session to kickstart your metabolism",
      calories: "320 cal",
    },
    {
      id: 2,
      title: "Core Strengthening",
      duration: "15 min",
      intensity: "Medium",
      completed: false,
      description: "Targeted core exercises for stability and strength",
      calories: "150 cal",
    },
    {
      id: 3,
      title: "Evening Yoga",
      duration: "30 min",
      intensity: "Low",
      completed: false,
      description: "Relaxing flow to wind down and improve flexibility",
      calories: "120 cal",
    },
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High":
        return "bg-secondary text-secondary-foreground";
      case "Medium":
        return "bg-primary text-primary-foreground";
      case "Low":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Today's Plan</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Personalized for your energy levels and goals
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Zap className="w-3 h-3 text-secondary" />
          Adaptive Mode On
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <Card
            key={workout.id}
            className={`p-6 border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${
              workout.completed ? "opacity-75" : "hover:shadow-card"
            }`}
          >
            {workout.completed && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {workout.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {workout.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1.5">
                  <Clock className="w-3 h-3" />
                  {workout.duration}
                </Badge>
                <Badge className={getIntensityColor(workout.intensity)}>
                  {workout.intensity}
                </Badge>
                <Badge variant="outline">{workout.calories}</Badge>
              </div>

              <Button
                variant={workout.completed ? "outline" : "default"}
                className="w-full"
                disabled={workout.completed}
              >
                {workout.completed ? "Completed ✓" : "Start Workout"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DailyPlan;
