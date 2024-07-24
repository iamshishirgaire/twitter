import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
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

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={src}
        playing={true}
        muted={!hasUserInteracted}
        controls
        width="100%"
        height="496px"
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
