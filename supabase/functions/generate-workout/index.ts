import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userGoal } = await req.json();

    console.log('Generate workout request:', { userGoal });

    const goalPrompts: Record<string, string> = {
      "lose-weight": "weight loss with calorie-burning cardio",
      "build-muscle": "muscle building with strength training",
      "improve-endurance": "endurance improvement with cardio",
      "flexibility": "flexibility with stretching and yoga",
      "general-fitness": "overall fitness with balanced training"
    };

    const goalText = goalPrompts[userGoal] || "general fitness";

    const prompt = `Generate a personalized daily workout plan focused on ${goalText}. 
    
Return ONLY a valid JSON array of 3-4 activities with this exact structure:
[
  {
    "type": "workout",
    "title": "Activity name",
    "duration": "XX min",
    "intensity": "High/Medium/Low",
    "description": "Brief description",
    "calories": "XXX cal",
    "completed": false
  }
]

Include a mix of workout, nutrition, and recovery activities. Be specific and actionable.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-nano-2025-08-07',
        messages: [
          { role: 'system', content: 'You are a professional fitness trainer. Return only valid JSON arrays.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated workout text:', generatedText);

    // Parse the JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }

    const activities = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify({ activities }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-workout function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
