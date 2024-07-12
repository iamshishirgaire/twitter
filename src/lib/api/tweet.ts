import api from "@/lib/api";
import { uploadFiles } from "@/lib/upload-files";
import Tweets from "../models/Tweets";

export async function postTweet(tweet: string, files: File[]) {
  const imageUrls = await uploadFiles(files);
  await api.post(`tweet`, {
    content: tweet?.replace(/^"|"$/g, ""),
    media_url: imageUrls,
  });
}

export async function getTweets() {
  const res = await api.get<Tweets[]>("/tweet/all");
  return res.data;
}
export async function postPoll(
  description: string,
  options: {
    id: string;
    value: string;
  }[],
  duration: Date,
) {
  await api.post(`poll`, {
    description: description.replace(/^"|"$/g, ""),
    options: options.map((option) => option.value),
    visibility: "public",
    duration: duration,
  });
}

export async function likeTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/like`);
}

export async function viewTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/view`);
}

export async function retweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/retweet`);
}

export async function comment(tweetId: string, comment: string) {
  await api.post(`tweet/${tweetId}/comment`, {
    content: comment,
  });
}

export async function getComments(tweetId: string, comment: string) {
  await api.post(`tweet/${tweetId}/comment`, {
    content: comment,
  });
}
export async function bookmarkTweet(tweetId: string) {
  await api.post(`tweet/${tweetId}/bookmark`);
}

export async function getPollDetail(id: string) {
  return (await api.get<Poll>(`poll/${id}`)).data;
}

export async function votePoll(id: string, option: number) {
  await api.post(`poll/vote`, {
    poll_id: id,
    vote_option: option,
  });
}
export async function getPollIds() {
  return (await api.get<{ id: string; user_id: string }[]>(`poll/feed`)).data;
}

interface Poll {
  poll_id: string;
  user_id: string;
  description: string;
  visibility: string;
  created_at: string;
  updated_at: string;
  like_count: string;
  comment_count: string;
  retweet_count: string;
  vote_count: string;
  view_count: string;
  voted_option: number;
  results: Result[];
}

interface Result {
  option: string;
  percentage: number;
}
