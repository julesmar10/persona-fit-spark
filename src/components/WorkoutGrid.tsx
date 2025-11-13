import WorkoutCard from "./WorkoutCard";

const WorkoutGrid = () => {
  const workouts = [
    {
      title: "Morning HIIT Blast",
      duration: "30 min",
      intensity: "High" as const,
      calories: "350 cal",
      type: "cardio" as const,
      image: "🏃",
      isToday: false,
    },
    {
      title: "Yoga Flow & Stretch",
      duration: "40 min",
      intensity: "Low" as const,
      calories: "180 cal",
      type: "yoga" as const,
      image: "🧘",
      isToday: false,
    },
    {
      title: "Core Strength Builder",
      duration: "35 min",
      intensity: "Medium" as const,
      calories: "280 cal",
      type: "strength" as const,
      image: "🎯",
      isToday: false,
    },
    {
      title: "Active Recovery Walk",
      duration: "25 min",
      intensity: "Low" as const,
      calories: "120 cal",
      type: "recovery" as const,
      image: "🚶",
      isToday: false,
    },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">This Week's Workouts</h2>
        <p className="text-base text-muted-foreground mt-2">
          Your personalized training schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workouts.map((workout, index) => (
          <div
            key={workout.title}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-fade-in"
          >
            <WorkoutCard {...workout} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkoutGrid;
