import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, Target, TrendingUp } from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface AISummaryCardProps {
  onboardingData: OnboardingData;
  onStart: () => void;
}

const AISummaryCard = ({ onboardingData, onStart }: AISummaryCardProps) => {
  const getPlanDescription = () => {
    const goalDescriptions: Record<string, string> = {
      "lose-weight": "calorie-burning workouts focused on fat loss and metabolic conditioning",
      "build-strength": "progressive strength training to build muscle and power",
      "stay-consistent": "balanced, sustainable routines that build lasting habits",
      "improve-endurance": "cardiovascular conditioning to boost stamina and endurance",
    };

    return goalDescriptions[onboardingData.goal] || "personalized fitness plan";
  };

  const getMotivationTone = () => {
    const tones: Record<string, string> = {
      "encouraging": "I'll be your supportive companion, celebrating every victory with you! 🎉",
      "challenging": "Get ready to push your limits. I won't let you settle for less! 💪",
      "data-driven": "I'll track every metric and show you the data behind your progress. 📊",
      "balanced": "I'll provide the perfect mix of encouragement and challenge. ⚖️",
    };

    return tones[onboardingData.motivationType] || "Let's do this together!";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl p-8 border-border/50 shadow-card animate-fade-in">
        <div className="text-center space-y-6">
          {/* AI Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Title */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Your Personalized Plan is Ready!
            </h2>
            <p className="text-muted-foreground">
              Based on your profile, I've created the perfect fitness journey for you
            </p>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-card p-6 rounded-xl text-left space-y-4">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">Your Goal</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I've built a <span className="text-foreground font-medium">6-week adaptive program</span> with {getPlanDescription()}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">Your Schedule</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Each session is designed for <span className="text-foreground font-medium">{onboardingData.timeAvailable} minutes</span>, 
                  perfectly tailored to fit your lifestyle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-foreground mb-1">My Coaching Style</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getMotivationTone()}
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              "Daily adaptive workouts",
              "Nutrition guidance",
              "Recovery tracking",
              "Progress insights",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {feature}
              </div>
            ))}
          </div>

          {/* Affirmation */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mt-4">
            <p className="text-center text-foreground font-medium italic">
              "Let's build momentum together. Every step forward is progress."
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={onStart}
            size="lg"
            className="w-full sm:w-auto px-8 mt-4 animate-pulse-glow"
          >
            Start Your Journey
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AISummaryCard;
