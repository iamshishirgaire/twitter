"use client";
import EmojiPicker from "@/components/emoji";
import { postPoll, postTweet } from "@/lib/api/tweet";
import { validatePoll, validateTweet } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import {
  AdjustmentsHorizontalIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { Button } from "../../../components/ui/button";
import { UserAvatar } from "../home/components/messageTile";
import { FilePreviews } from "./file-preview";
import PollComponent, { PollOption } from "./create-poll";
import TweetInput from "./tweet-input";
import Spacer from "@/components/spacer";

const AddPost = () => {
  const [tweet, setTweet] = useState<string | undefined>();
  const [files, setFiles] = useState<File[]>([]);
  const [pollMode, setPollMode] = useState<boolean>(false);
  const [options, setOptions] = useState<PollOption[]>([
    { id: "option1", value: "" },
    { id: "option2", value: "" },
  ]);
  const [duration, setDuration] = useState<Date | undefined>(undefined);
  const [emoji, setEmoji] = useState<string | undefined>();
  const userId = useAuthStore((state) => state.user?.id);
  const { mutateAsync, isLoading, isSuccess } = useMutation(
    "tweet",
    () =>
      pollMode
        ? postPoll(tweet ?? "", options, duration!)
        : postTweet(tweet ?? "", files),
    {
      onSuccess: () => {
        setTweet("");
        setFiles([]);
        setPollMode(false);
        setOptions([
          { id: "option1", value: "" },
          { id: "option2", value: "" },
        ]);
        setDuration(undefined);
        setEmoji(undefined);
      },
    },
  );
  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }
  if (!userId) {
    return <div className="h-full w-full animate-ping"></div>;
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
      <Spacer height={70} />

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
      {pollMode && (
        <PollComponent
          options={options}
          onOptionsChange={(e) => setOptions(e)}
          onDurationChange={(e) => setDuration(e)}
          onPollRemove={(e) => {
            setPollMode(e);
          }}
        />
      )}
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
            }}
            className="text-primary hover:bg-primary/35 hover:text-primary"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-primary" />
          </Button>

          <EmojiPicker onChange={setEmoji} />
        </div>
        <Button
          className="rounded-3xl"
          disabled={
            pollMode
              ? validatePoll(options, isLoading, duration, tweet)
              : validateTweet(tweet, isLoading)
          }
          onClick={(e) => {
            e.preventDefault();
            if (tweet && tweet.length > 0) {
              toast.promise(
                mutateAsync(),
                {
                  loading: "Uploading",
                  success: `${pollMode ? "Poll" : "Tweet"} uploaded successfully`,
                  error: `Failed to upload ${pollMode ? "Poll" : "Tweet"}`,
                },
                {
                  style: {
                    minWidth: "250px",
                  },
                },
              );
            }
          }}
        >
          {isLoading ? "Uploading" : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
