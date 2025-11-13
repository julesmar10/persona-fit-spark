import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Flame, Target, Sparkles } from "lucide-react";

const TodayWorkoutHighlight = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Today's Featured Workout
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Personalized just for you based on your energy and goals
        </p>
      </div>

      <Card 
        className="overflow-hidden border-primary/30 bg-gradient-card hover-lift"
        style={{ boxShadow: "var(--shadow-hover)" }}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image/Visual Section */}
          <div className="relative h-64 md:h-full overflow-hidden bg-gradient-hero">
            <div className="absolute inset-0 bg-background/5 backdrop-blur-[1px]" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
              <div className="text-9xl mb-4 animate-float">💪</div>
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                Upper Body Focus
              </Badge>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 animate-fade-in">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-white" />
                <div className="text-white">
                  <p className="text-2xl font-bold">420</p>
                  <p className="text-xs opacity-90">calories</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <div className="text-white">
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-xs opacity-90">minutes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-10 space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="px-4 py-1">
                High Intensity
              </Badge>
              <h3 className="text-3xl font-bold text-foreground">
                Power Upper Body Circuit
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Build strength and definition with this targeted upper body workout. 
                Perfect for your Wednesday energy peak!
              </p>
            </div>

            {/* Workout Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mint/10 rounded-2xl p-4 border border-mint/30">
                <Target className="w-6 h-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="font-bold text-foreground">Chest, Back, Arms</p>
              </div>
              <div className="bg-coral/10 rounded-2xl p-4 border border-coral/30">
                <Sparkles className="w-6 h-6 text-secondary mb-2" />
                <p className="text-sm text-muted-foreground">Equipment</p>
                <p className="font-bold text-foreground">Dumbbells, Bench</p>
              </div>
            </div>

            {/* Exercises Preview */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Today's Exercises</p>
              <div className="flex flex-wrap gap-2">
                {["Push-ups", "Rows", "Shoulder Press", "Bicep Curls", "Tricep Dips"].map((exercise) => (
                  <div
                    key={exercise}
                    className="px-3 py-1.5 rounded-full bg-background border border-border/50 text-sm text-muted-foreground"
                  >
                    {exercise}
                  </div>
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full gap-2 h-12 text-base">
              <Play className="w-5 h-5" />
              Start Workout Now
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default TodayWorkoutHighlight;
