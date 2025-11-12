import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ProgressOverview from "@/components/ProgressOverview";
import DailyPlan from "@/components/DailyPlan";
import AICompanion from "@/components/AICompanion";
import AchievementBanner from "@/components/AchievementBanner";

const Index = () => {
  const [userName] = useState("Alex");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader userName={userName} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Achievement Banner */}
          <AchievementBanner />

          {/* Progress Overview */}
          <ProgressOverview />

          {/* Daily Plan Section */}
          <DailyPlan />

          {/* AI Companion Section */}
          <AICompanion />
        </div>
      </main>
    </div>
  );
};

export default Index;
