import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    const systemPrompt = `You are an expert career and learning coach for BeyondResume AI.
Your goal is to help software engineers navigate their learning roadmap and achieve their career goals.
Be encouraging, concise, and highly practical. Use modern software engineering terminology.

Here is the current context about the user's roadmap:
${JSON.stringify(context, null, 2)}

Provide specific, actionable advice based on this context. Do not use markdown headers (# or ##) in your response, keep it conversational and use bullet points when necessary.`;

    const result = await streamText({
      model: google('models/gemini-2.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Roadmap Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
