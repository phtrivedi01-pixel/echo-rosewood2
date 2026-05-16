import fs from "fs";
import path from "path";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// Rachel — warm, unhurried female voice
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const OUTPUT_DIR = path.join(process.cwd(), "public", "audio");

const clips = [
  {
    filename: "isabella-whisper.mp3",
    text: "Isabella is arriving at three pm. She's one of ours — four stays across three properties. She likes quiet over flourish. This morning, the jasmine tea amenity is already in her room — she's had it at every property. Don't mention Camille. She'll find the garden on her own. Your job today is simply to be there without being seen. Echo score: ninety four. You're ready.",
  },
  {
    filename: "daniel-whisper.mp3",
    text: "Daniel checked in yesterday. First Rosewood stay. He's private — he's ordered everything through the app and declined turndown. Let him set the terms. We're still learning him. Today is about listening, not delivering. Echo score: forty one. If he engages, note everything. If he doesn't — that's information too.",
  },
  {
    filename: "isabella-afterglow.mp3",
    text: "Dear Isabella. During your stay, you found the creek trail twice. You ordered jasmine tea both mornings, and you spent four quiet hours in the ceramics studio on Saturday afternoon. We noticed. We thought you might want to know — Mara Solis, the artist in residence here last weekend, has a show opening at Rosewood London in September. We thought of you immediately. Until next time. Rosewood Sand Hill.",
  },
];

async function generateClip(filename: string, text: string): Promise<void> {
  console.log(`Generating ${filename}...`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.6,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs error for ${filename}: ${response.status} — ${err}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const outPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outPath, buffer);
  console.log(`  ✓ Saved to public/audio/${filename} (${buffer.length} bytes)`);
}

async function main() {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("ELEVENLABS_API_KEY is not set in environment");
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const clip of clips) {
    await generateClip(clip.filename, clip.text);
  }

  console.log("\nAll audio files generated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
