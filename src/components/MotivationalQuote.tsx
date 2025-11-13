import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const MotivationalQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const quotes = [
    {
      text: "The only bad workout is the one that didn't happen.",
      author: "Your FitAI Coach",
      gradient: "from-mint to-primary",
    },
    {
      text: "Progress, not perfection. You're exactly where you need to be.",
      author: "Your FitAI Coach",
      gradient: "from-coral to-secondary",
    },
    {
      text: "Rest is not giving up. It's preparing to come back stronger.",
      author: "Your FitAI Coach",
      gradient: "from-lavender to-accent",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];

  return (
    <Card 
      className="relative overflow-hidden border-border/30 animate-fade-in"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${quote.gradient} opacity-5`} />
      <div className="relative p-8 md:p-10">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${quote.gradient} flex items-center justify-center shrink-0 animate-glow`} style={{ boxShadow: "var(--shadow-soft)" }}>
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 space-y-3">
            <blockquote className="text-2xl md:text-3xl font-bold text-foreground leading-snug italic">
              "{quote.text}"
            </blockquote>
            <p className="text-base text-muted-foreground">
              — {quote.author}
            </p>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-6 justify-center">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuote(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentQuote
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MotivationalQuote;
