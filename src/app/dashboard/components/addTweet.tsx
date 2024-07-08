"use client";
import api from "@/lib/api";
import EmojiPicker from "@/components/emoji";
import { useAuthStore } from "@/store/auth.store";
import {
  AdjustmentsHorizontalIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { XCircleIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { UserAvatar } from "../messages/components/messageTile";
import TweetInput from "./tweet-input";
import { uploadFiles } from "@/lib/upload-files";
import { useMutation } from "react-query";

const AddPost = () => {
  const [tweet, setTweet] = useState<string | undefined>();
  const [files, setFiles] = useState<File[]>([]);
  const [emoji, setEmoji] = useState<string | undefined>();
  const [preview, setPreview] = useState<string[]>([]);
  const userId = useAuthStore((state) => state.user?.id);
  const [success, setSuccess] = useState(false);
  const { mutate, isLoading } = useMutation(
    "tweet",
    async () => {
      const imageUrls = await uploadFiles(files);
      await api.post(`tweet`, {
        content: tweet?.replace(/^"|"$/g, ""),
        media_url: imageUrls,
      });
    },
    {
      onSuccess: () => {
        setTweet("");
        setFiles([]);
        setPreview([]);
        setSuccess(true);
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
    return <div className="size-8 animate-ping rounded-full"></div>;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (
      selectedFile &&
      !files.some((file) => file.name === selectedFile.name)
    ) {
      setFiles((prev) => {
        return prev ? [...prev, selectedFile] : [selectedFile];
      });
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview((prev) => {
        return prev ? [...prev, previewUrl] : [previewUrl];
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => {
      return prev.filter((_, i) => i !== index);
    });
    setPreview((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <UserAvatar userId={userId ?? ""} />
        <TweetInput
          setSuccess={setSuccess}
          emoji={emoji ?? ""}
          success={success}
          onChange={(e) => {
            setTweet(e);
          }}
        />
      </div>
      <div className="mb-4">
        {files && (
          <div className="flex flex-col items-center border-b-2 border-border/50">
            <div className="grid grid-cols-2 gap-2 rounded-md p-4">
              {preview &&
                preview.map((url, index) => (
                  <div key={url} className="relative">
                    <XCircleIcon
                      onClick={() => handleRemoveFile(index)}
                      className="absolute right-5 top-2 z-10 size-7 rounded-full bg-black p-[5px] text-gray-200 transition-colors duration-200 hover:bg-gray-700"
                    />
                    {files[index].type.startsWith("image/") && (
                      <img
                        src={url}
                        alt="Selected File"
                        className="max-h-96 max-w-full rounded-sm"
                      />
                    )}
                    {files[index].type.startsWith("video/") && (
                      <video
                        src={url}
                        controls={false}
                        className="max-h-96 max-w-full"
                      ></video>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
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
            className="text-primary hover:bg-primary/35 hover:text-primary"
          >
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-primary" />
          </Button>

          <EmojiPicker onChange={setEmoji} />
        </div>
        <Button
          className="rounded-3xl"
          disabled={tweet === undefined || tweet.length < 1 || isLoading}
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
