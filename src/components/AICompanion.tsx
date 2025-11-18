import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AICompanion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Great job on your morning HIIT! I noticed your heart rate peaked at 175 BPM. How are you feeling?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickReplies = [
    "I'm feeling energized! 💪",
    "A bit tired today",
    "Ready for more!",
    "Need a rest day",
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Emotionally intelligent AI responses based on context
    const contextualResponses: Record<string, string> = {
      "tired": "Rest is progress too — take it easy today. 💙 I've added a gentle recovery session tomorrow.",
      "low energy": "I hear you. Let's shift today's plan to something lighter. Your body needs this break. 🧘",
      "skip": "No problem! Recovery day activated. Tomorrow's plan will maintain your momentum without overload. ✨",
      "hard": "You're pushing through — that's real strength. 💪 Tomorrow will be more balanced. Keep going!",
      "easy": "Perfect! I'm adding a bonus challenge tomorrow since you're feeling strong. Let's build on this! 🔥",
      "motivated": "Love this energy! ⚡ I'm optimizing your plan to match this momentum. You're unstoppable!",
      "energized": "Perfect! 💪 I've analyzed your energy levels and optimized tomorrow's workout. You're building incredible momentum!",
      "rest": "Rest is crucial for progress. 💙 I've scheduled a recovery day for tomorrow to help your muscles rebuild stronger.",
      "ready": "That's the spirit! 🚀 Based on your excellent progress, I'm adding a bonus challenge to push your limits safely.",
      "need": "I hear you. 🧘 I've adjusted your evening session to be more restorative with gentle stretching and breathing exercises.",
    };

    let aiResponseText = "That sounds great! I've adjusted tomorrow's workout to build on today's momentum. 💪";
    
    // Check for contextual keywords
    const lowerText = text.toLowerCase();
    for (const [keyword, response] of Object.entries(contextualResponses)) {
      if (lowerText.includes(keyword)) {
        aiResponseText = response;
        break;
      }
    }
    
    // Simulate quick AI response (< 1 second for perceived responsiveness)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary" />
          AI Companion
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          Real-time feedback and adaptive recommendations
        </p>
      </div>

      <Card className="border-border/50 overflow-hidden hover-lift" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="bg-gradient-card p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center animate-glow" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">FitAI Assistant</p>
              <p className="text-sm text-muted-foreground">Always learning, always adapting</p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[320px] p-6">
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl transition-all duration-300 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border/30"
                  }`}
                  style={
                    message.sender === "ai"
                      ? { boxShadow: "var(--shadow-soft)" }
                      : undefined
                  }
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-border/50 space-y-4 bg-background/50">
          <div className="flex flex-wrap gap-3">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(reply)}
                className="text-sm hover-lift"
              >
                {reply}
              </Button>
            ))}
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Share your thoughts..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1 h-11 rounded-xl"
            />
            <Button onClick={() => handleSendMessage(inputValue)} size="icon" className="h-11 w-11">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AICompanion;
