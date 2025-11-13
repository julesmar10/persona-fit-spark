import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlanRatingCard = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    setSubmitted(true);
    
    const messages = {
      5: { title: "Perfect alignment! 🎯", description: "Your plan is hitting all the right notes. Keep crushing it!" },
      4: { title: "Great fit! 👍", description: "Your plan is working well. Small adjustments coming tomorrow." },
      3: { title: "Got it 📝", description: "I'll refine your plan to better match your energy and goals." },
      2: { title: "Let's adjust 🔄", description: "I'm recalibrating your plan based on this feedback." },
      1: { title: "Major changes needed 💙", description: "Don't worry — tomorrow's plan will be much more aligned." },
    };

    const message = messages[value as keyof typeof messages];
    toast({
      title: message.title,
      description: message.description,
      duration: 4000,
    });
  };

  if (submitted) {
    return (
      <Card className="p-8 border-border/50 bg-gradient-to-br from-mint/10 to-primary/10 animate-fade-in border-mint/30" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center animate-heart-beat" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
            <ThumbsUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg">Thanks for your feedback!</p>
            <p className="text-base text-muted-foreground">Your input helps me create better plans.</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 border-border/50 hover:border-coral/30 transition-all duration-300 hover-lift group" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start gap-5 mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-energy flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ boxShadow: "var(--shadow-glow-coral)" }}>
          <MessageSquare className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">Quick Check-In</h3>
          <p className="text-base text-muted-foreground">
            Did today's plan fit your goals and energy level?
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant={rating === value ? "default" : "outline"}
            size="lg"
            onClick={() => handleRate(value)}
            className="w-14 h-14 p-0 hover:scale-110 hover-lift transition-all"
          >
            <Star 
              className={`w-6 h-6 ${rating && rating >= value ? 'fill-current' : ''}`}
            />
          </Button>
        ))}
      </div>

      <div className="flex justify-between text-sm text-muted-foreground mt-4 px-2">
        <span>Not aligned</span>
        <span>Perfect fit</span>
      </div>
    </Card>
  );
};

export default PlanRatingCard;
