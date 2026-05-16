import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Écho, a hospitality intelligence system for Rosewood Hotels. Your role is to help staff deliver thoughtful, not creepy personalization. For each guest interaction opportunity, you must decide: Act Invisibly (do it without mentioning it), Offer Gently (suggest it as optional), Ask Permission (sensitive — check first), or Stay Silent (too intrusive or insufficient data). Always err on the side of restraint. Luxury guests do not want to feel surveilled. The highest score goes to the guest who never once felt the AI — but always felt seen. Return a JSON array of decision table rows.`;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "Server misconfigured: ANTHROPIC_API_KEY not set in environment." },
        { status: 500 }
      );
    }
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Request body must be a guest profile JSON object." },
        { status: 400 }
      );
    }

    const guestSummary = JSON.stringify(body, null, 2);

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Based on this guest profile, generate a decision table. Return ONLY a valid JSON array — no markdown, no explanation.

Each item must have:
- "opportunity": string (what staff could do)
- "aiDecision": string (one of: "Act Invisibly", "Offer Gently", "Ask Permission", "Stay Silent")
- "category": string (one of: "act-invisibly", "offer-gently", "ask-permission", "stay-silent")
- "why": string (brief reasoning)

Guest profile:
${guestSummary}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No text response from Claude." },
        { status: 500 }
      );
    }

    let decisions;
    try {
      const raw = textBlock.text.trim();
      // Strip markdown code fences if present
      const jsonStr = raw.startsWith("```")
        ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
        : raw;
      decisions = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json(
        { error: "Claude returned invalid JSON.", raw: textBlock.text },
        { status: 500 }
      );
    }

    return NextResponse.json({ decisions });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Invalid Anthropic API key." },
        { status: 401 }
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited. Please try again shortly." },
        { status: 429 }
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Anthropic API error: ${error.message}` },
        { status: error.status ?? 500 }
      );
    }
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
