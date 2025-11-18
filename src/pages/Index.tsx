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
import VisualShowcase from "@/components/VisualShowcase";
import TodayWorkoutHighlight from "@/components/TodayWorkoutHighlight";
import WorkoutGrid from "@/components/WorkoutGrid";
import MotivationalQuote from "@/components/MotivationalQuote";
import QuickStats from "@/components/QuickStats";
import UserProfile from "@/components/UserProfile";
import WeeklyProgressBar from "@/components/WeeklyProgressBar";
import { DailyPlanSkeleton, DashboardSkeleton } from "@/components/LoadingState";

type AppState = "onboarding" | "summary" | "dashboard";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
  const [userName] = useState("Alex");
  const [showSkipHandler, setShowSkipHandler] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
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
      <DashboardHeader userName={userName} onProfileClick={() => setShowUserProfile(true)} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="space-y-12">

              {/* Hero Progress Ring */}
              <div className="flex justify-center">
                <div className="relative">
                  <svg className="transform -rotate-90 w-48 h-48 md:w-56 md:h-56">
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="100"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(4/5) * 2 * Math.PI * 100} ${2 * Math.PI * 100}`}
                      strokeLinecap="round"
                      className="animate-glow"
                      style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-5xl md:text-6xl font-bold text-white">80%</p>
                    <p className="text-sm text-white/90 mt-2">Weekly Goal</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Achievement Banner */}
          <AchievementBanner />

          {/* Motivational Quote */}
          <MotivationalQuote />

          {/* Weekly Progress Bar */}
          <section className="rounded-3xl bg-card p-8 animate-fade-in" style={{ boxShadow: "var(--shadow-soft)" }}>
            <WeeklyProgressBar />
          </section>

          {/* Quick Stats */}
          <QuickStats />

          {/* Progress Overview */}
          <ProgressOverview />

          {/* Today's Featured Workout */}
          <TodayWorkoutHighlight />

          {/* Workout Grid */}
          <WorkoutGrid />

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

          {/* Visual Journey Showcase */}
          <VisualShowcase />

          {/* Evaluation Summary */}
          <EvaluationSummary />

          {/* Skip Workout Handler (conditional) */}
          {showSkipHandler && <SkipWorkoutHandler onClose={() => setShowSkipHandler(false)} />}
        </div>

        {/* Footer Spacing */}
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-sm">
            Your journey to better health, powered by AI that adapts to you
          </p>
        </div>
      </main>

      {/* Consent Modal */}
      <ConsentModal 
        open={showConsentModal} 
        onComplete={() => setShowConsentModal(false)} 
      />

      {/* User Profile Modal */}
      <UserProfile
        open={showUserProfile}
        onOpenChange={setShowUserProfile}
        userName={userName}
      />
    </div>
  );
};

export default Index;
