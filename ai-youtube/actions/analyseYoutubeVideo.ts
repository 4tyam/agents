"use server";

import { redirect } from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
  const url = formData.get("url")?.toString();
  if (!url) return;

  // TODO
  const videoId = "abc";
  if (!videoId) return;

  return redirect(`/video/${videoId}/analysis`);
}
