import { Progress } from "@/components/ui/progress";

const WeeklyProgressBar = () => {
  const completedWorkouts = 4;
  const plannedWorkouts = 5;
  const progressPercentage = (completedWorkouts / plannedWorkouts) * 100;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Weekly Progress</h3>
          <p className="text-sm text-muted-foreground">
            {completedWorkouts} of {plannedWorkouts} workouts completed
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-foreground">{Math.round(progressPercentage)}%</p>
          <p className="text-xs text-muted-foreground">Complete</p>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-4 bg-muted"
        />
        <div 
          className="absolute top-0 left-0 h-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <span>Remaining</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressBar;
