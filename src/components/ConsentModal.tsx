import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield, Clock, Trash2, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsentModalProps {
  open: boolean;
  onComplete: () => void;
}

const ConsentModal = ({ open, onComplete }: ConsentModalProps) => {
  const { toast } = useToast();
  const [consents, setConsents] = useState({
    wearableSync: false,
    analytics: false,
    dataRetention: false,
  });

  const handleConsent = (key: keyof typeof consents) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = () => {
    toast({
      title: "Privacy preferences saved ✓",
      description: "Your data choices have been recorded. You can update these anytime.",
      duration: 3000,
    });
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint to-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl">Data & Privacy</DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed">
            We're transparent about how we use your information. Choose what you're comfortable sharing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <Checkbox 
                id="wearable" 
                checked={consents.wearableSync}
                onCheckedChange={() => handleConsent('wearableSync')}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="wearable" className="text-base font-semibold cursor-pointer flex items-center gap-2">
                  <Activity className="w-4 h-4 text-mint" />
                  Sync Wearable Data
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect fitness trackers to personalize your daily plans based on sleep, heart rate, and activity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <Checkbox 
                id="analytics" 
                checked={consents.analytics}
                onCheckedChange={() => handleConsent('analytics')}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="analytics" className="text-base font-semibold cursor-pointer flex items-center gap-2">
                  <Clock className="w-4 h-4 text-coral" />
                  Usage Analytics
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Help us improve by sharing anonymous usage patterns and feature effectiveness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <Checkbox 
                id="retention" 
                checked={consents.dataRetention}
                onCheckedChange={() => handleConsent('dataRetention')}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="retention" className="text-base font-semibold cursor-pointer flex items-center gap-2">
                  <Trash2 className="w-4 h-4 text-lavender" />
                  Historical Data
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep your workout history to track long-term progress. You can delete it anytime.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Your rights:</strong> View, export, or delete your data anytime in Settings. 
              We never sell your information.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleSubmit}>
            Skip for now
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConsentModal;
