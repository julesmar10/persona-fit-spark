import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();
    console.log('AI Companion received message:', message);

    const apiKey = Deno.env.get('OPEN_API_KEY');
    if (!apiKey) {
      console.error('OPEN_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build messages array from conversation history
    const messages = [
      {
        role: 'system',
        content: `You are a supportive, emotionally intelligent fitness AI companion. Your role is to:
- Provide personalized encouragement and motivation
- Give adaptive workout recommendations based on how users feel
- Respond empathetically to their energy levels and mood
- Use emojis naturally to convey warmth and enthusiasm (💪, 💙, ✨, 🔥, etc.)
- Keep responses concise and actionable (2-3 sentences)
- Focus on progress, not perfection
- Adjust workout intensity based on feedback

When users express:
- Low energy/tiredness: Recommend rest and recovery
- High energy/motivation: Suggest bonus challenges
- Mixed feelings: Offer balanced, supportive guidance`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 150,
        temperature: 0.8
      })
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', openAIResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: 'OpenAI API error', details: errorText }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await openAIResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('No reply in OpenAI response:', data);
      return new Response(
        JSON.stringify({ error: 'No response from AI' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('AI Companion reply:', reply);
    
    return new Response(
      JSON.stringify({ reply }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in ai-companion function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'An unexpected error occurred while processing your message.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
