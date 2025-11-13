import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const SmartScheduling = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <Card className="border-border/50 bg-gradient-card overflow-hidden hover-lift glow-on-hover">
        <div className="p-8">
          <div className="flex items-start gap-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform" style={{ boxShadow: "var(--shadow-soft)" }}>
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
                  <AlertCircle className="w-5 h-5 text-secondary" />
                  Smart Schedule Adjustment
                </h3>
                <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                  I noticed your calendar is packed tomorrow morning. I've moved your 7 AM workout to 6 PM when you're typically free.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-3 text-sm bg-background/60 px-4 py-3 rounded-xl border border-border/50">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground line-through">Tomorrow 7:00 AM</span>
                  <span className="text-foreground font-semibold">→ 6:00 PM</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button size="sm" variant="default" className="gap-2">
                  Confirm Change
                </Button>
                <Button size="sm" variant="outline">
                  Keep Original Time
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default SmartScheduling;
