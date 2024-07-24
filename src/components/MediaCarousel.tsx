import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { isVideo } from "@/lib/utils";
import VideoPlayer from "./video_player";
import Image from "next/image";

const MediaCarousel = ({ mediaUrls }: { mediaUrls: string[] }) => {
  return (
    <Carousel className="">
      <CarouselContent className="flex h-[400px] max-w-md items-center">
        {mediaUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="border-border/50 bg-background">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Link
                    className="flex flex-row items-center justify-center rounded-sm bg-background"
                    key={url}
                    href={`/media/${index}`}
                    passHref
                  >
                    {isVideo(url) ? (
                      <VideoPlayer src={mediaUrls[index]} />
                    ) : (
                      <Image
                        src={url}
                        alt="Multiple Images"
                        width={400}
                        height={400}
                        objectFit="cover"
                        priority
                        style={{ height: "400px", width: "400px" }}
                        className="aspect-square rounded-sm object-cover"
                      />
                    )}
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MediaCarousel;
