import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Flame, Target, Award, Clock, Dumbbell, Heart } from "lucide-react";
import FitnessPersonas from "./FitnessPersonas";
import { OnboardingData } from "./OnboardingFlow";

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  onboardingData?: OnboardingData | null;
}

const UserProfile = ({ open, onOpenChange, userName, onboardingData }: UserProfileProps) => {
  const achievements = [
    { icon: <Flame className="w-4 h-4" />, label: "12-Day Streak", color: "from-coral to-secondary" },
    { icon: <Trophy className="w-4 h-4" />, label: "5 Weeks Strong", color: "from-mint to-primary" },
    { icon: <Target className="w-4 h-4" />, label: "80% This Week", color: "from-secondary to-coral" },
    { icon: <Award className="w-4 h-4" />, label: "Early Riser", color: "from-lavender to-accent" },
  ];

  const getPreferenceLabel = (key: string, value: string) => {
    const labels: Record<string, Record<string, string>> = {
      goal: {
        "build-muscle": "Build Muscle",
        "lose-weight": "Lose Weight",
        "improve-endurance": "Improve Endurance",
        "increase-flexibility": "Increase Flexibility",
        "general-fitness": "General Fitness"
      },
      timeAvailable: {
        "15-20": "15-20 minutes",
        "30-45": "30-45 minutes",
        "45-60": "45-60 minutes",
        "60+": "60+ minutes"
      },
      equipment: {
        "no-equipment": "No Equipment",
        "basic": "Basic Equipment",
        "full-gym": "Full Gym Access"
      },
      workoutStyle: {
        "high-intensity": "High Intensity",
        "steady-moderate": "Steady & Moderate",
        "low-impact": "Low Impact",
        "mixed": "Mixed Approach"
      },
      motivationType: {
        "encouraging": "Encouraging & Supportive",
        "challenging": "Challenging & Pushing",
        "balanced": "Balanced Approach"
      }
    };
    return labels[key]?.[value] || value;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            {userName}'s Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Onboarding Preferences */}
          {onboardingData && (
            <section>
              <h3 className="text-xl font-bold text-foreground mb-4">Your Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4 border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Fitness Goal</span>
                  </div>
                  <p className="font-semibold text-foreground">{getPreferenceLabel('goal', onboardingData.goal)}</p>
                </div>

                <div className="rounded-xl p-4 border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Time Available</span>
                  </div>
                  <p className="font-semibold text-foreground">{getPreferenceLabel('timeAvailable', onboardingData.timeAvailable)}</p>
                </div>

                <div className="rounded-xl p-4 border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mint to-mint/70 flex items-center justify-center">
                      <Dumbbell className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Equipment</span>
                  </div>
                  <p className="font-semibold text-foreground">{getPreferenceLabel('equipment', onboardingData.equipment)}</p>
                </div>

                <div className="rounded-xl p-4 border border-border/50 bg-card/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-coral/70 flex items-center justify-center">
                      <Flame className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Workout Style</span>
                  </div>
                  <p className="font-semibold text-foreground">{getPreferenceLabel('workoutStyle', onboardingData.workoutStyle)}</p>
                </div>

                <div className="rounded-xl p-4 border border-border/50 bg-card/50 md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lavender to-lavender/70 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">Motivation Style</span>
                  </div>
                  <p className="font-semibold text-foreground">{getPreferenceLabel('motivationType', onboardingData.motivationType)}</p>
                </div>
              </div>
            </section>
          )}

          {/* Achievement Badges */}
          <section>
            <h3 className="text-xl font-bold text-foreground mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl p-4 border border-border/50 hover-lift cursor-pointer"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                      {achievement.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.label}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fitness Personas */}
          <FitnessPersonas />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
