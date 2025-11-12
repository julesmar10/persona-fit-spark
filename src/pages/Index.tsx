import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import ProgressOverview from "@/components/ProgressOverview";
import DailyPlan from "@/components/DailyPlan";
import AICompanion from "@/components/AICompanion";
import AchievementBanner from "@/components/AchievementBanner";
import OnboardingFlow, { OnboardingData } from "@/components/OnboardingFlow";
import AISummaryCard from "@/components/AISummaryCard";
import ProgressDashboard from "@/components/ProgressDashboard";
import SmartScheduling from "@/components/SmartScheduling";

type AppState = "onboarding" | "summary" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [userName] = useState("Alex");

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setAppState("summary");
  };

  const handleStartJourney = () => {
    setAppState("dashboard");
  };

  // Onboarding Flow
  if (appState === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // AI Summary Card
  if (appState === "summary" && onboardingData) {
    return <AISummaryCard onboardingData={onboardingData} onStart={handleStartJourney} />;
  }

  // Main Dashboard
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

          {/* Smart Scheduling */}
          <SmartScheduling />

          {/* Daily Plan Section */}
          <DailyPlan />

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* AI Companion Section */}
          <AICompanion />
        </div>
      </main>
    </div>
  );
};

export default Index;
