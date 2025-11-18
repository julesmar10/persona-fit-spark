import { Clock, Zap, CheckCircle2, Apple, Moon, Dumbbell, Heart, ThumbsUp, Frown, Battery, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

interface DailyPlanProps {
  userGoal?: string;
}

const DailyPlan = ({ userGoal = "lose-weight" }: DailyPlanProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
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
      case "workout": return "bg-gradient-to-br from-mint to-primary";
      case "nutrition": return "bg-gradient-to-br from-coral to-secondary";
      case "recovery": return "bg-gradient-to-br from-lavender to-accent";
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

    const feedbackMessages: Record<string, { title: string; description: string; emoji: string }> = {
      "loved": {
        title: "Fantastic energy! 💪",
        description: "I'm adding a bonus challenge for tomorrow. You're crushing it!",
        emoji: "🎉"
      },
      "okay": {
        title: "Steady progress",
        description: "I'll keep tomorrow's intensity similar. Consistency is key!",
        emoji: "👍"
      },
      "tired": {
        title: "Recovery mode activated",
        description: "Tomorrow will be lighter with extra stretching. Rest is part of the journey!",
        emoji: "💙"
      },
    };

    if (feedback) {
      const message = feedbackMessages[feedback];
      toast({
        title: message.title,
        description: message.description,
        duration: 5000,
      });
    }
  };

  const completeActivity = (activityId: number) => {
    setActivities(activities.map(a => 
      a.id === activityId ? { ...a, completed: true } : a
    ));
  };

  const generateAIRecommendations = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to generate recommendations.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const goalDescriptions: Record<string, string> = {
        "lose-weight": "weight loss and fat burning with high-calorie burn exercises",
        "build-strength": "strength building and muscle growth with resistance training",
        "stay-consistent": "consistent habit formation with moderate, sustainable workouts",
        "improve-endurance": "cardiovascular endurance and stamina improvement",
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a professional fitness coach. Generate exactly 3 diverse workout recommendations in JSON format."
            },
            {
              role: "user",
              content: `Generate 3 new workout recommendations for someone focused on ${goalDescriptions[userGoal] || "general fitness"}. Return ONLY a JSON array with this exact structure: [{"title": "workout name", "duration": "X min", "intensity": "High/Medium/Low", "description": "brief description", "calories": "X cal"}]. No extra text.`
            }
          ],
          temperature: 0.8,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Extract OpenAI's error message
        const errorMessage = data.error?.message || `API error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const content = data.choices[0].message.content;
      
      // Parse the JSON response (handle markdown code blocks)
      let workouts;
      try {
        // Remove markdown code blocks if present
        const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
        workouts = JSON.parse(cleanContent);
      } catch (parseError) {
        console.error("Failed to parse AI response:", content);
        throw new Error("Failed to parse AI recommendations. Please try again.");
      }
      
      // Add the AI-generated workouts to the activities
      const newActivities = workouts.map((workout: any, index: number) => ({
        id: activities.length + index + 1,
        type: "workout" as ActivityType,
        title: workout.title,
        duration: workout.duration,
        intensity: workout.intensity,
        completed: false,
        description: workout.description,
        calories: workout.calories,
      }));

      setActivities([...activities, ...newActivities]);

      toast({
        title: "✨ AI Recommendations Generated!",
        description: `Added 3 personalized workouts for ${userGoal.replace("-", " ")}`,
      });
    } catch (error) {
      console.error("Error generating recommendations:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
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

        {/* AI Recommendations Section */}
        <Card className="p-4 bg-gradient-to-br from-mint/5 to-primary/5 border-mint/20">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-mint" />
                  <h3 className="font-semibold text-foreground">AI Workout Generator</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get personalized workout recommendations based on your {userGoal.replace("-", " ")} goal
                </p>
              </div>
              <Button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                variant="outline"
                size="sm"
                className="shrink-0"
              >
                {showApiKeyInput ? "Hide" : "Setup"}
              </Button>
            </div>

            {showApiKeyInput && (
              <div className="space-y-3 pt-3 border-t border-border/30">
                <Alert variant="destructive" className="bg-destructive/5">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Security Warning:</strong> Your API key will be sent directly to OpenAI from your browser. 
                    For production apps, use a backend service. Never share your API key publicly.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-sm">OpenAI API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">platform.openai.com/api-keys</a>
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={generateAIRecommendations}
              disabled={isGenerating || !apiKey.trim()}
              className="w-full bg-gradient-to-r from-mint to-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Recommendations
                </>
              )}
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activities.map((activity, index) => {
          const TypeIcon = getTypeIcon(activity.type);
          return (
            <Card
              key={activity.id}
              className={`p-8 border-border/50 transition-all duration-300 group relative overflow-hidden ${
                activity.completed ? "opacity-70" : "hover:animate-lift hover:border-mint/50"
              }`}
              style={{ 
                boxShadow: activity.completed ? "var(--shadow-soft)" : "var(--shadow-card)"
              }}
            >
              {activity.completed && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
              )}

              <div className="space-y-5">
                <div className="flex items-start gap-5">
                  <div 
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${getTypeColor(activity.type)}`}
                    style={{ 
                      boxShadow: activity.type === 'workout' ? 'var(--shadow-glow-mint)' : 
                                 activity.type === 'nutrition' ? 'var(--shadow-glow-coral)' : 
                                 'var(--shadow-soft)' 
                    }}
                  >
                    <TypeIcon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-mint transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
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
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm font-medium text-muted-foreground mb-3">How did it feel?</p>
                    <div className="flex gap-3">
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
                          className={`gap-2 text-sm flex-1 ${activity.feedback === feedbackOption.type ? 'animate-heart-beat' : ''}`}
                        >
                          <feedbackOption.icon className="w-4 h-4" />
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
