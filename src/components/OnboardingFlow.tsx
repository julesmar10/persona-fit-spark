import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, Clock, Dumbbell, Heart, ChevronRight, CheckCircle2 } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  goal: string;
  timeAvailable: string;
  equipment: string;
  workoutStyle: string;
  motivationType: string;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({});

  const updateData = (key: keyof OnboardingData, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(data as OnboardingData);
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1: return !!data.goal;
      case 2: return !!data.timeAvailable;
      case 3: return !!data.equipment;
      case 4: return !!data.workoutStyle;
      case 5: return !!data.motivationType;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 border-border/50 shadow-card animate-fade-in">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-full h-1 rounded-full mx-1 transition-all duration-300 ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Step {step} of 5
          </p>
        </div>

        {/* Step 1: Goal Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">What's Your Main Goal?</h2>
              <p className="text-muted-foreground">
                This helps me create the perfect plan for you
              </p>
            </div>

            <RadioGroup
              value={data.goal}
              onValueChange={(value) => updateData("goal", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
            >
              {[
                { value: "lose-weight", label: "Lose Weight", emoji: "🔥", desc: "Burn fat and feel lighter" },
                { value: "build-strength", label: "Build Strength", emoji: "💪", desc: "Get stronger and more powerful" },
                { value: "stay-consistent", label: "Stay Consistent", emoji: "📅", desc: "Build a lasting habit" },
                { value: "improve-endurance", label: "Improve Endurance", emoji: "🏃", desc: "Go longer and stronger" },
              ].map((goal) => (
                <Label
                  key={goal.value}
                  htmlFor={goal.value}
                  className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                    data.goal === goal.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={goal.value} id={goal.value} className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{goal.emoji}</span>
                      <span className="font-semibold text-foreground">{goal.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{goal.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 2: Time Available */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">How Much Time Do You Have?</h2>
              <p className="text-muted-foreground">
                I'll design workouts that fit your schedule
              </p>
            </div>

            <RadioGroup
              value={data.timeAvailable}
              onValueChange={(value) => updateData("timeAvailable", value)}
              className="space-y-3 mt-8"
            >
              {[
                { value: "15-20", label: "15-20 minutes", desc: "Quick and efficient sessions" },
                { value: "30-40", label: "30-40 minutes", desc: "Balanced workout time" },
                { value: "45-60", label: "45-60 minutes", desc: "Full comprehensive workouts" },
                { value: "60+", label: "60+ minutes", desc: "Extended training sessions" },
              ].map((time) => (
                <Label
                  key={time.value}
                  htmlFor={time.value}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                    data.timeAvailable === time.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={time.value} id={time.value} />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{time.label}</span>
                    <p className="text-sm text-muted-foreground">{time.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 3: Equipment */}
        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Dumbbell className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">What Equipment Do You Have?</h2>
              <p className="text-muted-foreground">
                I'll adapt exercises to your available gear
              </p>
            </div>

            <RadioGroup
              value={data.equipment}
              onValueChange={(value) => updateData("equipment", value)}
              className="space-y-3 mt-8"
            >
              {[
                { value: "none", label: "No Equipment", desc: "Bodyweight exercises only" },
                { value: "minimal", label: "Minimal (Bands, Dumbbells)", desc: "Basic home setup" },
                { value: "home-gym", label: "Home Gym", desc: "Multiple equipment options" },
                { value: "full-gym", label: "Full Gym Access", desc: "Complete gym equipment" },
              ].map((equip) => (
                <Label
                  key={equip.value}
                  htmlFor={equip.value}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                    data.equipment === equip.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={equip.value} id={equip.value} />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{equip.label}</span>
                    <p className="text-sm text-muted-foreground">{equip.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 4: Workout Style */}
        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">What's Your Workout Style?</h2>
              <p className="text-muted-foreground">
                Let's match your personality
              </p>
            </div>

            <RadioGroup
              value={data.workoutStyle}
              onValueChange={(value) => updateData("workoutStyle", value)}
              className="space-y-3 mt-8"
            >
              {[
                { value: "intense", label: "High Intensity", desc: "Push hard, maximum effort" },
                { value: "steady", label: "Steady Pace", desc: "Consistent, sustainable effort" },
                { value: "mindful", label: "Mindful Movement", desc: "Focus on form and breathing" },
                { value: "mixed", label: "Mixed Approach", desc: "Variety keeps me engaged" },
              ].map((style) => (
                <Label
                  key={style.value}
                  htmlFor={style.value}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                    data.workoutStyle === style.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={style.value} id={style.value} />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{style.label}</span>
                    <p className="text-sm text-muted-foreground">{style.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Step 5: Motivation Type */}
        {step === 5 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">How Should I Motivate You?</h2>
              <p className="text-muted-foreground">
                I'll adjust my coaching tone to support you best
              </p>
            </div>

            <RadioGroup
              value={data.motivationType}
              onValueChange={(value) => updateData("motivationType", value)}
              className="space-y-3 mt-8"
            >
              {[
                { value: "encouraging", label: "Encouraging & Supportive", desc: "You've got this! Let's celebrate wins" },
                { value: "challenging", label: "Direct & Challenging", desc: "Push harder, no excuses" },
                { value: "data-driven", label: "Data & Progress Focused", desc: "Show me the numbers and trends" },
                { value: "balanced", label: "Balanced Approach", desc: "Mix of support and challenge" },
              ].map((motivation) => (
                <Label
                  key={motivation.value}
                  htmlFor={motivation.value}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                    data.motivationType === motivation.value ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={motivation.value} id={motivation.value} />
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{motivation.label}</span>
                    <p className="text-sm text-muted-foreground">{motivation.desc}</p>
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="gap-2"
          >
            {step === 5 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Complete Setup
              </>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
