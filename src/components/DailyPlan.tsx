import { Clock, Zap, CheckCircle2, Apple, Moon, Dumbbell, Heart, ThumbsUp, Frown, Battery } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type ActivityType = "workout" | "nutrition" | "recovery";
type FeedbackType = "loved" | "okay" | "tired" | null;

interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  duration: string;
  intensity?: string;
  completed: boolean;
  description: string;
  calories?: string;
  feedback?: FeedbackType;
}

const DailyPlan = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "workout",
      title: "Morning HIIT",
      duration: "25 min",
      intensity: "High",
      completed: true,
      description: "Explosive cardio session to kickstart your metabolism",
      calories: "320 cal",
      feedback: "loved",
    },
    {
      id: 2,
      type: "nutrition",
      title: "Post-Workout Nutrition",
      duration: "5 min read",
      completed: false,
      description: "Protein-rich meal ideas to fuel recovery and muscle growth",
    },
    {
      id: 3,
      type: "workout",
      title: "Core Strengthening",
      duration: "15 min",
      intensity: "Medium",
      completed: false,
      description: "Targeted core exercises for stability and strength",
      calories: "150 cal",
    },
    {
      id: 4,
      type: "recovery",
      title: "Evening Wind Down",
      duration: "20 min",
      completed: false,
      description: "Gentle stretching and breathing to prepare for quality sleep",
    },
  ]);

  const getTypeIcon = (type: ActivityType) => {
    switch (type) {
      case "workout": return Dumbbell;
      case "nutrition": return Apple;
      case "recovery": return Moon;
    }
  };

  const getTypeColor = (type: ActivityType) => {
    switch (type) {
      case "workout": return "text-secondary";
      case "nutrition": return "text-accent";
      case "recovery": return "text-primary";
    }
  };

  const getIntensityColor = (intensity?: string) => {
    if (!intensity) return "";
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

  const handleFeedback = (activityId: number, feedback: FeedbackType) => {
    setActivities(activities.map(a => 
      a.id === activityId ? { ...a, feedback } : a
    ));

    const feedbackMessages: Record<string, string> = {
      "loved": "Amazing! 🎉 I'm adding a bonus challenge for tomorrow based on your energy!",
      "okay": "Got it. I'll keep tomorrow's intensity similar to today.",
      "tired": "No worries! 💙 I'm adjusting tomorrow's plan to be lighter and more restorative.",
    };

    if (feedback) {
      toast({
        title: "Feedback received",
        description: feedbackMessages[feedback],
      });
    }
  };

  const completeActivity = (activityId: number) => {
    setActivities(activities.map(a => 
      a.id === activityId ? { ...a, completed: true } : a
    ));
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activities.map((activity) => {
          const TypeIcon = getTypeIcon(activity.type);
          return (
            <Card
              key={activity.id}
              className={`p-6 border-border/50 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${
                activity.completed ? "opacity-75" : "hover:shadow-card"
              }`}
            >
              {activity.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-card flex items-center justify-center shrink-0 ${getTypeColor(activity.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <Clock className="w-3 h-3" />
                    {activity.duration}
                  </Badge>
                  {activity.intensity && (
                    <Badge className={getIntensityColor(activity.intensity)}>
                      {activity.intensity}
                    </Badge>
                  )}
                  {activity.calories && (
                    <Badge variant="outline">{activity.calories}</Badge>
                  )}
                </div>

                {activity.completed && activity.type === "workout" && (
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">How did it feel?</p>
                    <div className="flex gap-2">
                      {[
                        { type: "loved" as FeedbackType, icon: Heart, label: "Loved it!" },
                        { type: "okay" as FeedbackType, icon: ThumbsUp, label: "It was okay" },
                        { type: "tired" as FeedbackType, icon: Battery, label: "Too tired" },
                      ].map((feedbackOption) => (
                        <Button
                          key={feedbackOption.type}
                          variant={activity.feedback === feedbackOption.type ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFeedback(activity.id, feedbackOption.type)}
                          className="gap-1.5 text-xs flex-1"
                        >
                          <feedbackOption.icon className="w-3 h-3" />
                          <span className="hidden sm:inline">{feedbackOption.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  variant={activity.completed ? "outline" : "default"}
                  className="w-full"
                  onClick={() => completeActivity(activity.id)}
                  disabled={activity.completed}
                >
                  {activity.completed ? "Completed ✓" : `Start ${activity.type === "workout" ? "Workout" : activity.type === "nutrition" ? "Reading" : "Recovery"}`}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default DailyPlan;
