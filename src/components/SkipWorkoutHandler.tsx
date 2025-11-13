import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";

interface SkipWorkoutHandlerProps {
  onClose: () => void;
}

const SkipWorkoutHandler = ({ onClose }: SkipWorkoutHandlerProps) => {
  return (
    <Card className="border-lavender/50 bg-gradient-to-br from-lavender/10 to-accent/10 animate-fade-in hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="p-8">
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-calm flex items-center justify-center shrink-0 animate-heart-beat" style={{ boxShadow: "var(--shadow-soft)" }}>
            <Heart className="w-7 h-7 text-white" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="font-bold text-foreground text-xl mb-2">
                Recovery Day Added
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                I've noticed you need some rest. Tomorrow is now a gentle recovery day to help you 
                maintain your amazing 12-day streak while giving your body the care it deserves.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm bg-background/60 px-5 py-3 rounded-xl border border-border/50">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-muted-foreground">Tomorrow:</span>
              <span className="text-foreground font-semibold">Gentle Stretching & Meditation</span>
            </div>

            <div className="pt-2">
              <Button onClick={onClose} variant="outline" size="default" className="w-full h-11">
                Got it, thanks!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SkipWorkoutHandler;
