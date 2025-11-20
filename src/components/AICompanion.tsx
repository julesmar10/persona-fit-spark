import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import logo from "@/assets/fitai-logo.png";

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
  const [isLoading, setIsLoading] = useState(false);

  const quickReplies = [
    "I'm feeling energized! 💪",
    "A bit tired today",
    "Ready for more!",
    "Need a rest day",
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error } = await supabase.functions.invoke('ai-companion', {
        body: { 
          message: text,
          conversationHistory: updatedMessages.slice(0, -1) // Send all messages except the one we just added
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to get AI response');
      }

      if (data?.error) {
        console.error('AI error:', data.error);
        throw new Error(data.error);
      }

      if (!data?.reply) {
        throw new Error('No response from AI');
      }

      const aiMessage: Message = {
        id: updatedMessages.length + 1,
        text: data.reply,
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message in chat
      const errorMessage: Message = {
        id: updatedMessages.length + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-hero flex items-center justify-center animate-glow p-2" style={{ boxShadow: "var(--shadow-glow-mint)" }}>
              <img src={logo} alt="FitAI Logo" className="w-full h-full object-contain" />
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
                disabled={isLoading}
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
              onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSendMessage(inputValue)}
              className="flex-1 h-11 rounded-xl"
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSendMessage(inputValue)} 
              size="icon" 
              className="h-11 w-11"
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default AICompanion;
