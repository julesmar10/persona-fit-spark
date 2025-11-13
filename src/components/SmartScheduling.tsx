import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, AlertCircle } from "lucide-react";

const SmartScheduling = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <Card className="border-border/50 bg-gradient-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-secondary" />
                  Smart Schedule Adjustment
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  I noticed your calendar is packed tomorrow morning. I've moved your 7 AM workout to 6 PM when you're typically free.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-2 text-sm bg-background/50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground line-through">Tomorrow 7:00 AM</span>
                  <span className="text-foreground font-medium">→ 6:00 PM</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="default">
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
