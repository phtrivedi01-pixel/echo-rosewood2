import { notFound } from "next/navigation";
import guests from "@/data/guests.json";
import { WhisperBrief } from "@/components/whisper-brief";

export const dynamic = "force-dynamic";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await new Promise((r) => setTimeout(r, 500));
  const { id } = await params;
  const guest = guests.find((g) => g.id === id);
  if (!guest) notFound();

  return <WhisperBrief guest={guest} />;
}
