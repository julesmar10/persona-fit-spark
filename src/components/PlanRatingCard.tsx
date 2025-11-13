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
      <Card className="p-6 border-border/50 bg-gradient-to-br from-mint/5 to-primary/5 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-mint to-primary flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Thanks for your feedback!</p>
            <p className="text-sm text-muted-foreground">Your input helps me create better plans.</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-border/50 hover:border-mint/30 transition-all duration-300 group" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-secondary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-1">Quick Check-In</h3>
          <p className="text-sm text-muted-foreground">
            Did today's plan fit your goals and energy level?
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant={rating === value ? "default" : "outline"}
            size="lg"
            onClick={() => handleRate(value)}
            className="w-12 h-12 p-0 hover:scale-110 transition-all"
          >
            <Star 
              className={`w-5 h-5 ${rating && rating >= value ? 'fill-current' : ''}`}
            />
          </Button>
        ))}
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mt-2 px-1">
        <span>Not aligned</span>
        <span>Perfect fit</span>
      </div>
    </Card>
  );
};

export default PlanRatingCard;
