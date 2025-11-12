import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar } from "lucide-react";

interface SkipWorkoutHandlerProps {
  onClose: () => void;
}

const SkipWorkoutHandler = ({ onClose }: SkipWorkoutHandlerProps) => {
  return (
    <Card className="border-accent/50 bg-gradient-to-br from-accent/5 to-accent/10 animate-fade-in">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0 animate-pulse-glow">
            <Heart className="w-6 h-6 text-accent-foreground" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-1">
                Recovery Day Added
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I've noticed you need some rest. Tomorrow is now a gentle recovery day to help you 
                maintain your amazing 12-day streak while giving your body the care it deserves.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm bg-background/50 px-4 py-2 rounded-lg">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Tomorrow:</span>
              <span className="text-foreground font-medium">Gentle Stretching & Meditation</span>
            </div>

            <div className="pt-2">
              <Button onClick={onClose} variant="outline" size="sm" className="w-full">
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
