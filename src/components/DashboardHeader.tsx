import { Dumbbell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FitAI Coach
            </h1>
            <p className="text-xs text-muted-foreground">Your Adaptive Companion</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">{userName}</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
