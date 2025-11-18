import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPEN_API_KEY');

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

Return a JSON object with an "activities" array containing 3-4 activities. Use this exact structure:
{
  "activities": [
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
}

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
          { role: 'system', content: 'You are a professional fitness trainer. You must respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        max_completion_tokens: 800,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      return new Response(JSON.stringify({ 
        error: `OpenAI API error: ${response.status}`,
        details: errorText 
      }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', data);
      return new Response(JSON.stringify({ 
        error: 'Invalid response from AI service',
        details: 'Missing expected data structure'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const generatedText = data.choices[0].message.content;

    // Log the raw response for debugging
    console.log('Raw AI response:', generatedText);

    // Safely parse the JSON
    let parsed;
    try {
      if (!generatedText || generatedText.trim() === '') {
        throw new Error('AI returned empty response');
      }
      parsed = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse text:', generatedText);
      return new Response(JSON.stringify({ 
        error: 'Failed to parse AI response',
        details: parseError instanceof Error ? parseError.message : 'Invalid JSON format'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate the activities array
    if (!parsed.activities || !Array.isArray(parsed.activities)) {
      console.error('Response missing activities array:', parsed);
      return new Response(JSON.stringify({ 
        error: 'AI response did not contain activities array',
        details: 'Expected an object with an activities array'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const activities = parsed.activities;

    console.log(`Successfully generated ${activities.length} activities`);

    return new Response(JSON.stringify({ activities }), {
      status: 200,
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
