"use client";

import { createOrGetVideo } from "@/actions/createOrGetVideo";
import AiAgentChat from "@/components/AiAgentChat";
import ThumbnailGeneration from "@/components/ThumbnailGeneration";
import TitleGenerations from "@/components/TitleGenerations";
import Transcription from "@/components/Transcription";
import Usage from "@/components/Usage";
import YoutubeVideoDetails from "@/components/YoutubeVideoDetails";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag } from "@/features/flags";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { user } = useUser();
  const { videoId } = params;
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async () => {
      const response = await createOrGetVideo(videoId as string, user.id);

      if (!response.success) {
        toast.error("Error createing or getting video", {
          description: response.error,
          duration: 10000,
        });
      } else {
        setVideo(response.data!);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  return (
    <div className="xl:container mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="order-2 lg:order-1 flex flex-col gap-1 bg-white lg:border-r border-gray-200 p-6">
          {/* Analysis Section */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-xl">
            <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Analyse Video"
            />

            {/* Video Transcription Status */}
          </div>

          {/* Youtube Video Details */}
          <YoutubeVideoDetails videoId={videoId} />

          {/* Thumbnail Generation */}
          <ThumbnailGeneration videoId={videoId} />

          {/* Title Generation */}
          <TitleGenerations videoId={videoId} />

          {/* Transcription */}
          <Transcription videoId={videoId} />
        </div>

        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          {/* Ai Agent Chat */}
          <AiAgentChat videoId={videoId} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
