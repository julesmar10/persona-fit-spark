import { Dumbbell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mint to-primary flex items-center justify-center" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
            <Dumbbell className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-mint to-primary bg-clip-text text-transparent">
              FitAI Coach
            </h1>
            <p className="text-sm text-muted-foreground font-medium">Your Adaptive Companion</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2 hover:scale-105">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{userName}</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
