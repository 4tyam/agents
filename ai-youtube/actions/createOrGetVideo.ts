"use server";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { checkFeatureUsageLimit } from "@/lib/checkFeatureUsageLimit";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";

export interface VideoResponse {
  success: boolean;
  data?: Doc<"videos">;
  error?: string;
}

export const createOrGetVideo = async (
  videoId: string,
  userId: string
): Promise<VideoResponse> => {
  const convex = getConvexClient();
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  //   const featureCheck = await checkFeatureUsageLimit(
  //     user.id,
  //     featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
  //   );

  //   if (!featureCheck.success) {
  //     return {
  //       success: false,
  //       error: featureCheck.error,
  //     };
  //   }

  try {
    const video = await convex.query(api.videos.getVideoById, {
      videoId,
      userId,
    });

    if (!video) {
      // Analyse event
      console.log("Spending token");

      const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
        videoId,
        userId,
      });

      const newVideo = await convex.query(api.videos.getVideoById, {
        videoId: newVideoId,
        userId,
      });

      //Tracking
      //   await client.track({
      //     event: featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
      //     company: {
      //         id: userId,
      //     },
      //     user: {
      //         id: userId
      //     }
      //   });

      return {
        success: true,
        data: newVideo!,
      };
    } else {
      console.log("Video exists - no token needs to be spent");
      return {
        success: true,
        data: video,
      };
    }
  } catch (error) {
    console.error("Error creating or getting video", error);
    return {
      success: false,
      error: "An error occurred, please try again later",
    };
  }
};
