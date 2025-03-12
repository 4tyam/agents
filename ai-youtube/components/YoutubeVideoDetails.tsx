"use client";

import { getVideoDetails } from "@/actions/getVideoDetails";
import { VideoDetails } from "@/types/types";
import { Calendar, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);
      setVideo(video);
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!video) return <div>Video not found</div>;

  console.log(video);

  return (
    <div className="@container bg-white rounded-xl">
      <div className="flex flex-col gap-8 mt-4">
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={500}
          height={500}
          className="w-full rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Video Details */}
      <div className="flex-grow space-y-4">
        <h1 className="text-2xl @lg:text-3xl font-bold text-gray-900 leading-tight line-clamp-2 mt-4">
          {video.title}
        </h1>

        {/* Channel Info */}
        <div className="flex items-center gap-4">
          <Image
            src={video.channel.thumbnail}
            alt={video.channel.title}
            width={48}
            height={48}
            className="size-10 @md:w-12 @md:h-12 rounded-full border-2 border-gray-100"
          />

          <div>
            <p className="text-base @md:text-lg font-semibold text-gray-900">
              {video.channel.title}
            </p>
            <p className="text-sm @md:text-base text-gray-600">
              {video.channel.subscribers}
            </p>
          </div>
        </div>

        {/* Video Stats */}
        <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="size-4 text-gray-600" />
              <p className="text-sm text-gray-900">Published</p>
            </div>

            <p className="font-medium text-gray-900 text-sm">
              {new Date(video.publishedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="size-4 text-gray-600" />
              <p className="text-sm text-gray-900">Views</p>
            </div>

            <p className="font-medium text-gray-900 text-sm">{video.views}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsUp className="size-4 text-gray-600" />
              <p className="text-sm text-gray-900">Likes</p>
            </div>

            <p className="font-medium text-gray-900 text-sm">{video.likes}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 transition-all duration-300 hover:bg-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="size-4 text-gray-600" />
              <p className="text-sm text-gray-900">Comments</p>
            </div>

            <p className="font-medium text-gray-900 text-sm">
              {video.comments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YoutubeVideoDetails;
