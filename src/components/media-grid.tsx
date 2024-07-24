import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isVideo } from "@/lib/utils";
import { VideoPlayer } from "./video_player";
import MediaCarousel from "./MediaCarousel";

interface DynamicGridProps {
  imageUrls: string[];
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({ imageUrls }) => {
  const getImageComponent = () => {
    const count = imageUrls.length;

    return (
      <>
        {count === 1 && (
          <div className="flex items-center justify-center rounded-sm bg-background py-4">
            {isVideo(imageUrls[0]) ? (
              <VideoPlayer src={imageUrls[0]} />
            ) : (
              <Image
                src={imageUrls[0]}
                alt="Single Image"
                width={382}
                height={382}
                priority
                className="rounded-sm"
                style={{ height: "384px", width: "auto", objectFit: "cover" }}
              />
            )}
          </div>
        )}
        {count > 1 && (
          <div className="flex w-full items-center justify-center pt-2">
            <MediaCarousel mediaUrls={imageUrls} />
          </div>
        )}
      </>
    );
  };

  return <div className="mt-4">{getImageComponent()}</div>;
};
