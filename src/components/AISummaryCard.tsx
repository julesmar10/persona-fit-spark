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
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl p-10 border-border/50 hover-lift glow-on-hover animate-fade-in" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="text-center space-y-8">
          {/* AI Icon */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-hero flex items-center justify-center mx-auto animate-glow" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-foreground">
              Your Personalized Plan is Ready!
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Based on your profile, I've created the perfect fitness journey for you
            </p>
          </div>

          {/* AI Summary */}
          <div className="bg-gradient-card p-8 rounded-2xl text-left space-y-6 border border-border/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0" style={{ boxShadow: "var(--shadow-soft)" }}>
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2 text-lg">Your Goal</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  I've built a <span className="text-foreground font-semibold">6-week adaptive program</span> with {getPlanDescription()}.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0" style={{ boxShadow: "var(--shadow-soft)" }}>
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2 text-lg">Your Schedule</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Each session is designed for <span className="text-foreground font-semibold">{onboardingData.timeAvailable} minutes</span>, 
                  perfectly tailored to fit your lifestyle.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0" style={{ boxShadow: "var(--shadow-soft)" }}>
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground mb-2 text-lg">My Coaching Style</p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {getMotivationTone()}
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            {[
              "Daily adaptive workouts",
              "Nutrition guidance",
              "Recovery tracking",
              "Progress insights",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-base text-muted-foreground"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {feature}
              </div>
            ))}
          </div>

          {/* Affirmation */}
          <div className="bg-lavender/10 border-2 border-lavender/30 rounded-2xl p-6 mt-6">
            <p className="text-center text-foreground font-semibold text-lg italic">
              "Let's build momentum together. Every step forward is progress."
            </p>
          </div>

          {/* CTA */}
          <Button
            onClick={onStart}
            size="lg"
            className="w-full sm:w-auto px-10 mt-6 text-base"
          >
            Start Your Journey
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AISummaryCard;
