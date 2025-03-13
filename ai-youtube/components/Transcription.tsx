"use client";

import { FeatureFlag } from "@/features/flags";
// import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { useState } from "react";
import Usage from "./Usage";

interface TranscriptEntry {
  text: string;
  timestamp: string;
}

function Transcription({ videoId }: { videoId: string }) {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  }>();

  //   const { featureUsageExceeded } = useSchematicEntitlement(
  //     FeatureFlag.TRANSCRIPTION
  //   );

  const featureUsageExceeded = false;

  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
      <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

      {/* Transcription */}
      {!featureUsageExceeded ? (
        <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
          {transcript ? (
            transcript.transcript.map((entry, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-sm text-gray-400 min-w-[50px]">
                  {entry.timestamp}
                </span>
                <span className="text-sm">{entry.text}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No transcriptions available</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Transcription;
