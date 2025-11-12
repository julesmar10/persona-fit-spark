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

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Perfect! Let's adjust tomorrow's intensity based on how you're feeling today.",
        "I understand. I've adjusted your evening workout to be more restorative.",
        "That's the spirit! I'm adding a bonus challenge to your next session.",
        "Rest is crucial for progress. I've scheduled a recovery day for tomorrow.",
      ];
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          AI Companion
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time feedback and adaptive recommendations
        </p>
      </div>

      <Card className="border-border/50 overflow-hidden">
        <div className="bg-gradient-card p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">FitAI Assistant</p>
              <p className="text-xs text-muted-foreground">Always learning, always adapting</p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[300px] p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border/50 space-y-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(reply)}
                className="text-xs"
              >
                {reply}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Share your thoughts..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage(inputValue)} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AICompanion;
