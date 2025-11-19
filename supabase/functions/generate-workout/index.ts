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
    const { userGoal } = await req.json();
    console.log('Generating workouts for goal:', userGoal);

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

    // Map user goals to workout descriptions
    const goalDescriptions: Record<string, string> = {
      'lose-weight': 'weight loss with high-calorie burn',
      'build-muscle': 'muscle building and strength training',
      'improve-endurance': 'endurance and cardiovascular fitness',
      'increase-flexibility': 'flexibility and mobility',
      'general-fitness': 'overall fitness and health'
    };

    const goalDescription = goalDescriptions[userGoal] || 'general fitness';

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a fitness coach AI. You must respond with valid JSON only, no markdown, no explanations. Your response must be a JSON object with a "workouts" array containing exactly 3 workout objects.'
          },
          {
            role: 'user',
            content: `Generate 3 diverse workouts optimized for ${goalDescription}. Return ONLY valid JSON in this exact format:
{
  "workouts": [
    {
      "title": "Workout Name",
      "duration": "X min",
      "intensity": "High|Medium|Low",
      "description": "Brief description",
      "calories": "XXX cal",
      "type": "workout"
    }
  ]
}

Make the workouts varied (e.g., HIIT, strength, cardio) and appropriate for the goal.`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000
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

    const rawText = await openAIResponse.text();
    console.log('Raw OpenAI response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse:', rawText.substring(0, 500));
      return new Response(
        JSON.stringify({ 
          error: 'Failed to parse AI response',
          details: 'The AI returned invalid JSON. Please try again.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate the response structure
    if (!data.workouts || !Array.isArray(data.workouts)) {
      console.error('Invalid response structure:', data);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response structure',
          details: 'The AI response did not contain a valid workouts array.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Successfully generated', data.workouts.length, 'workouts');
    
    return new Response(
      JSON.stringify({ workouts: data.workouts }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in generate-workout function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'An unexpected error occurred while generating workouts.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
