import React, { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (hasUserInteracted) {
              videoElement.play().catch((error) => {
                console.error("Failed to play the video:", error);
              });
            } else {
              videoElement.muted = true;
              videoElement.play().catch((error) => {
                console.error("Failed to play the muted video:", error);
              });
            }
          } else {
            videoElement.pause();
            console.log("Playback paused");
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, [hasUserInteracted]);

  return (
    <video
      ref={videoRef}
      controls
      controlsList="nodownload"
      className="rounded-sm"
      width="600"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
