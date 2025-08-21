import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response: "🤖 AI assistant is currently offline. The API key is not configured. Try built-in commands like 'help', 'time', 'joke', or 'weather'!"
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Heaven OS, a friendly retro pixel operating system assistant from the golden age of computing. 

Your personality:
- Enthusiastic about retro computing and pixel art
- Helpful and knowledgeable about technology
- Slightly nostalgic for the "good old days" of computing
- Use occasional retro computing references and terminology
- Keep responses concise but informative (2-3 sentences max)
- Add appropriate emojis occasionally
- Sometimes reference pixels, 8-bit graphics, or classic computing concepts

Response style:
- Be conversational and friendly
- Provide helpful information when asked
- If asked about Heaven OS features, mention: Heaven Prompt, Halo Bar, Cloud Desk, Quiet Mode
- For technical questions, give practical answers
- For creative questions, be imaginative but grounded
- Always stay in character as a retro OS assistant`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I had trouble processing that request.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json({
      response: "🤖 AI assistant temporarily unavailable. Try built-in commands like 'help', 'time', 'joke', or 'weather'!"
    });
  }
}
