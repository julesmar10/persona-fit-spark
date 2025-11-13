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
import WeeklyInsights from "@/components/WeeklyInsights";
import NextWeekPreview from "@/components/NextWeekPreview";
import SkipWorkoutHandler from "@/components/SkipWorkoutHandler";
import ConsentModal from "@/components/ConsentModal";
import PlanRatingCard from "@/components/PlanRatingCard";
import EvaluationSummary from "@/components/EvaluationSummary";
import { DailyPlanSkeleton, DashboardSkeleton } from "@/components/LoadingState";

type AppState = "onboarding" | "summary" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [userName] = useState("Alex");
  const [showSkipHandler, setShowSkipHandler] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setAppState("summary");
  };

  const handleStartJourney = () => {
    setIsLoading(true);
    // Simulate loading time (< 2 seconds as per requirements)
    setTimeout(() => {
      setIsLoading(false);
      setAppState("dashboard");
      // Show consent modal after 3 seconds on dashboard
      setTimeout(() => setShowConsentModal(true), 3000);
    }, 1800);
  };

  // Onboarding Flow
  if (appState === "onboarding") {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  // AI Summary Card with Loading
  if (appState === "summary" && onboardingData) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-4xl">
            <DashboardSkeleton />
          </div>
        </div>
      );
    }
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

          {/* Daily Plan Section */}
          {isLoading ? <DailyPlanSkeleton /> : <DailyPlan />}

          {/* Plan Rating */}
          <PlanRatingCard />

          {/* AI Companion Section */}
          <AICompanion />

          {/* Progress Dashboard */}
          <ProgressDashboard />

          {/* Smart Scheduling */}
          <SmartScheduling />

          {/* Weekly Insights */}
          <WeeklyInsights />

          {/* Next Week Preview */}
          <NextWeekPreview />

          {/* Evaluation Summary */}
          <EvaluationSummary />

          {/* Skip Workout Handler (conditional) */}
          {showSkipHandler && <SkipWorkoutHandler onClose={() => setShowSkipHandler(false)} />}
        </div>
      </main>

      {/* Consent Modal */}
      <ConsentModal 
        open={showConsentModal} 
        onComplete={() => setShowConsentModal(false)} 
      />
    </div>
  );
};

export default Index;
