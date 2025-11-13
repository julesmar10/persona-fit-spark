import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const FitnessPersonas = () => {
  const personas = [
    {
      name: "Morning Warrior",
      type: "Early Bird",
      image: "🌅",
      description: "You crush workouts at dawn",
      color: "from-coral to-secondary",
      stats: "5 morning sessions this week",
    },
    {
      name: "Strength Builder",
      type: "Power Lifter",
      image: "💪",
      description: "Building muscle & strength",
      color: "from-mint to-primary",
      stats: "+15% weight increase",
    },
    {
      name: "Cardio Champion",
      type: "Endurance Pro",
      image: "🏃",
      description: "Running towards your goals",
      color: "from-secondary to-coral",
      stats: "32 km this week",
    },
    {
      name: "Zen Master",
      type: "Recovery Focus",
      image: "🧘",
      description: "Balance through mindfulness",
      color: "from-lavender to-accent",
      stats: "8 recovery sessions",
    },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          Your Fitness Profile
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Personas that match your training style
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {personas.map((persona, index) => (
          <Card
            key={persona.name}
            className="group relative overflow-hidden border-border/50 hover-lift cursor-pointer"
            style={{
              animationDelay: `${index * 0.1}s`,
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Background gradient that animates on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${persona.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {persona.image}
                </div>
                <Badge variant="outline" className="text-xs">
                  {persona.type}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                  {persona.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {persona.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/50">
                <p className="text-xs text-muted-foreground">This week</p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {persona.stats}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FitnessPersonas;
