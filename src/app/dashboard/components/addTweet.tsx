"use client";
import api from "@/lib/api";

import { useAuthStore } from "@/store/auth.store";
import {
  AdjustmentsHorizontalIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { UserAvatar } from "../messages/components/messageTile";
import TweetInput from "./tweet-input";
import { SmileIcon, XCircleIcon } from "lucide-react";
import CustomEmojiPicker from "@/components/emoji";
import EmojiPicker from "@/components/emoji";

const AddPost = () => {
  const [tweet, setTweet] = useState<string | undefined>();
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const userId = useAuthStore((state) => state.user?.id);
  const [success, setSuccess] = useState(false);
  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }
  if (!userId) {
    return <div className="size-8 animate-ping rounded-full"></div>;
  }

  async function postTweet() {
    toast.promise(
      api.post(`tweet`, {
        content: tweet?.replace(/"/g, ""),
      }),

      {
        loading: "Loading",
        success: () => {
          setTweet("");
          setSuccess(true);
          return "Tweet uploaded successfully";
        },
        error: (_) => `Failed to upload tweet`,
      },
    );
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <UserAvatar userId={userId ?? ""} />
        <TweetInput
          setSuccess={setSuccess}
          success={success}
          onChange={(e) => {
            setTweet(e);
          }}
        />
      </div>
      <div className="mb-4">
        {file && (
          <div className="flex flex-col items-center border-b-2 border-border/50">
            <div className="relative rounded-md p-4">
              {preview && (
                <>
                  <Button
                    variant={"secondary"}
                    onClick={handleRemoveFile}
                    size={"icon"}
                    className="absolute right-5 top-5"
                  >
                    <XCircleIcon />
                  </Button>
                  {file.type.startsWith("image/") && (
                    <img
                      src={preview}
                      alt="Selected File"
                      className="max-h-96 max-w-full rounded-sm"
                    />
                  )}
                  {file.type.startsWith("video/") && (
                    <video
                      controls
                      src={preview}
                      className="max-h-96 max-w-full"
                    ></video>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <label>
            <PhotoIcon className="h-9 rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground" />
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <Button variant="ghost" size="icon">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </Button>

          <EmojiPicker
            onChange={(e) => {
              setTweet((prev) => {
                return prev ?? "" + e;
              });
            }}
          />
        </div>
        <Button
          disabled={tweet === undefined || tweet.length < 1}
          onClick={(e) => {
            e.preventDefault();
            if (tweet && tweet.length > 0) {
              postTweet();
            }
          }}
        >
          Tweet
        </Button>
      </div>
    </div>
  );
};

export default AddPost;
