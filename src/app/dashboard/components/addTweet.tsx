"use client";
import EmojiPicker from "@/components/emoji";
import { postTweet } from "@/lib/api/tweet";
import { useAuthStore } from "@/store/auth.store";
import {
  AdjustmentsHorizontalIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Button } from "../../../components/ui/button";
import { UserAvatar } from "../messages/components/messageTile";
import { FilePreviews } from "./file-preview";
import TweetInput from "./tweet-input";
import PollComponent from "./poll";
import { isValidContent } from "@/lib/utils";

const AddPost = () => {
  const [tweet, setTweet] = useState<string | undefined>();
  const [files, setFiles] = useState<File[]>([]);
  const [pollMode, setPollMode] = useState<boolean>(false);
  const [emoji, setEmoji] = useState<string | undefined>();
  const userId = useAuthStore((state) => state.user?.id);
  const { mutate, isLoading, isSuccess } = useMutation(
    "tweet",
    () => postTweet(tweet ?? "", files),
    {
      onSuccess: () => {
        setTweet("");
        setFiles([]);
        toast.success("Tweet uploaded successfully");
      },
      onError: () => {
        toast.error("Failed to upload tweet");
      },
    },
  );
  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }
  if (!userId) {
    return null;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPollMode(false);
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (
      selectedFile &&
      !files.some((file) => file.name === selectedFile.name)
    ) {
      setFiles((prev) => {
        return prev ? [...prev, selectedFile] : [selectedFile];
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };
  return (
    <div className="flex flex-col">
      <>
        <div className="flex gap-2">
          <UserAvatar userId={userId ?? ""} />
          <TweetInput
            mode={pollMode ? "poll" : "tweet"}
            emoji={emoji ?? ""}
            success={isSuccess}
            onChange={(e) => {
              setTweet(e);
            }}
          />
        </div>
        {files.length > 0 && (
          <FilePreviews files={files} onRemove={handleRemoveFile} />
        )}
      </>
      {pollMode && <PollComponent />}
      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="rounded-md px-2 py-2 text-primary hover:bg-primary/35">
            <PhotoIcon className="m-[2px] size-5" />
            <input
              type="file"
              multiple={true}
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setPollMode(!pollMode);
              setFiles([]);
            }}
            className="text-primary hover:bg-primary/35 hover:text-primary"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-primary" />
          </Button>

          <EmojiPicker onChange={setEmoji} />
        </div>
        <Button
          className="rounded-3xl"
          disabled={tweet === undefined || isValidContent(tweet) || isLoading}
          onClick={(e) => {
            e.preventDefault();
            if (tweet && tweet.length > 0) {
              mutate();
            }
          }}
        >
          {isLoading ? "Uploading" : "Tweet"}
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
