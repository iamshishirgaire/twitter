"use client";
import { useAuthStore } from "@/store/auth.store";
import {
  AdjustmentsHorizontalIcon,
  FaceSmileIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { UserAvatar } from "../messages/components/messageTile";
import { useState } from "react";
import api from "@/lib/api";
import toast from "react-hot-toast";

const AddPost = () => {
  const [tweet, setTweet] = useState<string | undefined>();
  const userId = useAuthStore((state) => state.user?.id);
  if (!userId) {
    useAuthStore.getState().getCurrentUser();
  }
  if (!userId) {
    return <div className="size-8 animate-ping rounded-full"></div>;
  }

  async function postTweet() {
    toast.promise(
      api.post(`tweet`, {
        content: tweet,
      }),

      {
        loading: "Loading",
        success: () => {
          setTweet("");
          return "Tweet uploaded successfully";
        },
        error: (_) => `Failed to upload tweet`,
      },
    );
  }

  return (
    <div>
      <div className="flex items-start gap-4">
        <UserAvatar userId={userId ?? ""} />
        <form className="flex-1">
          <Textarea
            value={tweet}
            onChange={(e) => {
              setTweet(e.target.value);
            }}
            placeholder={`What's happening?`}
            className="w-full resize-none border-0 bg-transparent focus:ring-0 focus-visible:ring-0"
            rows={2}
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="ghost" size="icon">
              <PhotoIcon className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <FaceSmileIcon className="h-5 w-5" />
            </Button>
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
        </form>
      </div>
    </div>
  );
};

export default AddPost;
