import { Award, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AchievementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="relative overflow-hidden border-accent/50 bg-gradient-to-r from-accent/10 to-accent/5 animate-fade-in">
      <div className="p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center animate-pulse-glow">
            <Award className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">New Achievement Unlocked!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              12-Day Consistency Streak - You're on fire! 🔥
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="shrink-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default AchievementBanner;
