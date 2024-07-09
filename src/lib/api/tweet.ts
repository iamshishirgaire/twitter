import api from "@/lib/api";
import { uploadFiles } from "@/lib/upload-files";

export async function postTweet(tweet: string, files: File[]) {
  const imageUrls = await uploadFiles(files);
  await api.post(`tweet`, {
    content: tweet?.replace(/^"|"$/g, ""),
    media_url: imageUrls,
  });
}

export async function postPoll(
  description: string,
  options: {
    id: string;
    value: string;
  }[],
  duration: string,
) {
  await api.post(`poll`, {
    description: description,
    options: options.map((option) => option.value),
    visibility: "public",
    duration: duration,
  });
}

async function likeTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/like`);
}

async function viewTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/view`);
}

async function retweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/retweet`);
}

async function comment(tweetId: string, comment: string) {
  await api.post(`tweet/${tweetId}/comment`, {
    content: comment,
  });
}

async function getComments(tweetId: string, comment: string) {
  await api.post(`tweet/${tweetId}/comment`, {
    content: comment,
  });
}
async function bookmarkTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/bookmark`);
}
