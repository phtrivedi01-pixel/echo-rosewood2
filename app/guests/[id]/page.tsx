import { notFound } from "next/navigation";
import guests from "@/data/guests.json";
import { WhisperBrief } from "@/components/whisper-brief";

export default async function GuestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guest = guests.find((g) => g.id === id);
  if (!guest) notFound();

  return <WhisperBrief guest={guest} />;
}

export function generateStaticParams() {
  return guests.map((g) => ({ id: g.id }));
}
