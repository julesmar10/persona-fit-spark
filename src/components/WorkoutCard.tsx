import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Flame, TrendingUp } from "lucide-react";

interface WorkoutCardProps {
  title: string;
  duration: string;
  intensity: "Low" | "Medium" | "High";
  calories: string;
  type: "strength" | "cardio" | "yoga" | "recovery";
  image: string;
  isToday?: boolean;
}

const WorkoutCard = ({ 
  title, 
  duration, 
  intensity, 
  calories, 
  type, 
  image,
  isToday = false 
}: WorkoutCardProps) => {
  const intensityColors = {
    Low: "bg-lavender/20 text-accent border-lavender/50",
    Medium: "bg-secondary/20 text-secondary border-secondary/50",
    High: "bg-coral/20 text-coral border-coral/50",
  };

  const typeGradients = {
    strength: "from-mint to-primary",
    cardio: "from-coral to-secondary",
    yoga: "from-lavender to-accent",
    recovery: "from-accent to-lavender",
  };

  return (
    <Card 
      className={`overflow-hidden border-border/50 hover-lift group cursor-pointer ${
        isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
      }`}
      style={{ boxShadow: isToday ? "var(--shadow-hover)" : "var(--shadow-card)" }}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${typeGradients[type]} opacity-90`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl">{image}</div>
        </div>
        
        {isToday && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-white text-primary font-bold px-3 py-1 animate-pulse-glow">
              Today's Workout
            </Badge>
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`${intensityColors[intensity]} border-2 font-semibold backdrop-blur-md`}
          >
            {intensity} Intensity
          </Badge>
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-coral" />
            <span className="text-sm font-semibold text-foreground">{calories}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span className="capitalize">{type}</span>
            </div>
          </div>
        </div>

        <Button 
          className="w-full gap-2 h-11 group-hover:scale-[1.02] transition-transform"
          variant={isToday ? "default" : "outline"}
        >
          <Play className="w-5 h-5" />
          {isToday ? "Start Workout" : "View Details"}
        </Button>
      </div>
    </Card>
  );
};

export default WorkoutCard;
