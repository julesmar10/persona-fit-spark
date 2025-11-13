import { Card } from "@/components/ui/card";
import { Dumbbell, Apple, Moon, Sparkles } from "lucide-react";

const VisualShowcase = () => {
  const visuals = [
    {
      icon: Dumbbell,
      title: "Strength Training",
      description: "Build power and muscle",
      gradient: "from-mint to-primary",
      image: "💪",
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Fuel your journey",
      gradient: "from-coral to-secondary",
      image: "🥗",
    },
    {
      icon: Moon,
      title: "Recovery",
      description: "Rest and recharge",
      gradient: "from-lavender to-accent",
      image: "😌",
    },
    {
      icon: Sparkles,
      title: "Celebration",
      description: "Achievements unlocked",
      gradient: "from-secondary to-primary",
      image: "🎉",
    },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-3">Your Journey Moments</h2>
        <p className="text-lg text-muted-foreground">
          Every step, every milestone, every celebration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visuals.map((visual, index) => (
          <Card
            key={index}
            className="p-0 border-border/50 overflow-hidden hover-lift group cursor-pointer"
            style={{
              animationDelay: `${index * 0.1}s`,
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Visual Area */}
            <div
              className={`h-56 bg-gradient-to-br ${visual.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
              
              {/* Animated circles */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 animate-pulse" />
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
              
              <span className="text-9xl relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {visual.image}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <visual.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{visual.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{visual.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default VisualShowcase;
