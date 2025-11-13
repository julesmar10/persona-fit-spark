import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, Smile, Heart, Shield, TrendingUp } from "lucide-react";

const EvaluationSummary = () => {
  const metrics = [
    {
      icon: Zap,
      label: "Average Latency",
      value: "1.8s",
      score: 95,
      color: "from-mint to-primary",
      status: "Excellent"
    },
    {
      icon: Target,
      label: "Goal Alignment",
      value: "91%",
      score: 91,
      color: "from-coral to-secondary",
      status: "Strong"
    },
    {
      icon: Smile,
      label: "Usability Score",
      value: "4.7 / 5",
      score: 94,
      color: "from-lavender to-accent",
      status: "Outstanding"
    },
    {
      icon: Heart,
      label: "Motivation Tone",
      value: "Warm & Consistent",
      score: 89,
      color: "from-coral to-secondary",
      status: "Empathetic"
    },
    {
      icon: Shield,
      label: "Compliance Clarity",
      value: "94%",
      score: 94,
      color: "from-mint to-primary",
      status: "Clear"
    },
  ];

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Prototype Evaluation</h2>
          <p className="text-base text-muted-foreground mt-2">
            Simulated testing results from stakeholder review
          </p>
        </div>
        <Badge variant="outline" className="gap-2 py-2 px-6 hover-lift">
          <TrendingUp className="w-5 h-5 text-mint" />
          Ready for Review
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="p-8 border-border/50 hover:border-mint/30 transition-all duration-300 hover-lift group"
              style={{ 
                boxShadow: "var(--shadow-card)",
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div 
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-base">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-bold text-foreground">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="h-2.5" />
                <Badge 
                  variant="secondary" 
                  className="text-sm mt-3 px-4 py-1"
                >
                  {metric.status}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 p-8 bg-gradient-to-br from-mint/10 to-primary/10 border-mint/30 hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center shrink-0 animate-glow" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-3">Executive Summary</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              The prototype demonstrates <strong>production-ready performance</strong> with sub-2-second load times 
              and <strong>91% goal alignment accuracy</strong>. User testing shows <strong>4.7/5 usability</strong> 
              with intuitive navigation and emotionally intelligent AI responses. Privacy compliance is 
              <strong> clearly communicated (94% clarity)</strong>, meeting regulatory standards. 
              Ready for stakeholder approval and pilot launch.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default EvaluationSummary;
