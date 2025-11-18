import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/fitai-logo.png";

interface DashboardHeaderProps {
  userName: string;
  onProfileClick: () => void;
}

const DashboardHeader = ({ userName, onProfileClick }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-50" style={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.06)" }}>
      <div className="container mx-auto px-6 py-6 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-hero rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-hero flex items-center justify-center p-2" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
              <img src={logo} alt="FitAI Coach Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-mint via-primary to-accent bg-clip-text text-transparent">
              FitAI Coach
            </h1>
            <p className="text-sm text-muted-foreground font-medium mt-0.5">Your Adaptive Companion</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral/10 to-secondary/10 border border-coral/20">
            <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-sm font-semibold text-foreground">12-day streak</span>
            <span className="text-lg">🔥</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 hover:scale-105 h-10 px-4 rounded-xl"
            onClick={onProfileClick}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">{userName}</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
