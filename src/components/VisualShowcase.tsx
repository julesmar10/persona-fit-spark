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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Your Journey Moments</h2>
        <p className="text-base text-muted-foreground mt-2">
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
              className={`h-48 bg-gradient-to-br ${visual.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" />
              <span className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                {visual.image}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-card flex items-center justify-center"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <visual.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{visual.title}</h3>
                  <p className="text-sm text-muted-foreground">{visual.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default VisualShowcase;
