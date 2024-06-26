import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  PhotoIcon,
  AdjustmentsHorizontalIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";

const AddPost = () => {
  return (
    <div>
      <div className="flex items-start gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <form className="flex-1">
          <Textarea
            placeholder={`What's happening?`}
            className="w-full resize-none border-0 bg-transparent focus:ring-0"
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
            <Button>Tweet</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
