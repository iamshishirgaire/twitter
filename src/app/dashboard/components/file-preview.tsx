import { XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export function FilePreviews({ files, onRemove }: FilePreviewProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.filter((ref) => ref !== null);
    videoRefs.current.forEach((video, index) => {
      if (video && files[index]?.type.startsWith("video/")) {
        const src = URL.createObjectURL(files[index]);
        if (video.src !== src) {
          video.src = src;
        }
      }
    });
  }, [files]);

  return (
    <div className="mt-2 border border-border/20 bg-zinc-900/20 p-4">
      {files.length > 1 ? (
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-md">
          {files.map((file: File, index: number) => (
            <div key={file.name} className="relative">
              <XCircleIcon
                onClick={() => onRemove(index)}
                className="absolute right-5 top-2 z-10 size-7 rounded-full bg-black p-[5px] text-gray-200 transition-colors duration-200 hover:bg-gray-700"
              />
              {file.type.startsWith("image/") && (
                <Image
                  height={296}
                  width={296}
                  src={URL.createObjectURL(file)}
                  alt="Selected File"
                  className="max-h-96 max-w-full rounded-sm"
                />
              )}
              {file.type.startsWith("video/") && (
                <video
                  ref={(e) => {
                    videoRefs.current[index] = e;
                  }}
                  controls
                  controlsList="nodownload"
                  className="max-h-96 max-w-full rounded-sm"
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-md p-4">
          <div className="relative">
            <XCircleIcon
              onClick={() => onRemove(0)}
              className="absolute right-2 top-2 z-10 size-7 rounded-full bg-black p-[5px] text-gray-200 transition-colors duration-200 hover:bg-gray-700"
            />
            {files[0].type.startsWith("image/") && (
              <Image
                src={URL.createObjectURL(files[0])}
                alt="Selected File"
                height={296}
                width={296}
                className="max-h-96 max-w-full rounded-sm"
              />
            )}
            {files[0].type.startsWith("video/") && (
              <video
                ref={(e) => {
                  videoRefs.current[0] = e;
                }}
                controls
                controlsList="nodownload"
                className="max-h-96 max-w-full rounded-sm"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
