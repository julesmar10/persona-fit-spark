import { Award, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AchievementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Card className="relative overflow-hidden border-coral/30 bg-gradient-celebration animate-fade-in" style={{ boxShadow: "var(--shadow-glow-coral)" }}>
      <div className="absolute inset-0 bg-background/95 backdrop-blur-sm"></div>
      <div className="relative p-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-coral flex items-center justify-center animate-heart-beat" style={{ boxShadow: "var(--shadow-glow-coral)" }}>
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-xl mb-1">New Achievement Unlocked!</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              12-Day Consistency Streak - You're absolutely crushing it! 🔥
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          className="shrink-0 hover:bg-background/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
};

export default AchievementBanner;
