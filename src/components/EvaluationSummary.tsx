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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Prototype Evaluation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Simulated testing results from stakeholder review
          </p>
        </div>
        <Badge variant="outline" className="gap-2 py-2 px-4">
          <TrendingUp className="w-4 h-4 text-mint" />
          Ready for Review
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="p-6 border-border/50 hover:border-mint/30 transition-all duration-300 group"
              style={{ 
                boxShadow: "var(--shadow-card)",
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Score</span>
                  <span className="font-semibold text-foreground">{metric.score}%</span>
                </div>
                <Progress value={metric.score} className="h-2" />
                <Badge 
                  variant="secondary" 
                  className="text-xs mt-2"
                >
                  {metric.status}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 p-6 bg-gradient-to-br from-mint/5 to-primary/5 border-mint/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint to-primary flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-2">Executive Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
