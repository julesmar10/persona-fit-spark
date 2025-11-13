import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { User, Trophy, Flame, Target, Award } from "lucide-react";
import FitnessPersonas from "./FitnessPersonas";

interface UserProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

const UserProfile = ({ open, onOpenChange, userName }: UserProfileProps) => {
  const achievements = [
    { icon: <Flame className="w-4 h-4" />, label: "12-Day Streak", color: "from-coral to-secondary" },
    { icon: <Trophy className="w-4 h-4" />, label: "5 Weeks Strong", color: "from-mint to-primary" },
    { icon: <Target className="w-4 h-4" />, label: "80% This Week", color: "from-secondary to-coral" },
    { icon: <Award className="w-4 h-4" />, label: "Early Riser", color: "from-lavender to-accent" },
  ];

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
