import api from "@/lib/api";
import { uploadFiles } from "@/lib/upload-files";

export async function postTweet(tweet: string, files: File[]) {
  const imageUrls = await uploadFiles(files);
  await api.post(`tweet`, {
    content: tweet?.replace(/^"|"$/g, ""),
    media_url: imageUrls,
  });
}

export async function postPoll(description: string, options: string[]) {
  await api.post(`/poll`, {
    description: description,
    options: options,
    visibility: "public",
  });
}
