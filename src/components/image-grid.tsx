import React from "react";
import Image from "next/image";
import Link from "next/link";

interface DynamicGridProps {
  imageUrls: string[];
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({ imageUrls }) => {
  const getImageComponent = () => {
    const count = imageUrls.length;

    return (
      <div
        className={`relative grid h-full w-full grid-cols-${count === 1 ? 1 : 2} gap-2`}
      >
        {count === 1 && (
          <div className="flex items-center justify-center rounded-sm border border-border/50 bg-background p-4">
            <Image
              src={imageUrls[0]}
              alt="Single Image"
              width={512}
              height={384}
              priority
              className="rounded-sm"
              style={{ height: "512px", width: "auto" }}
            />
          </div>
        )}
        {count > 1 &&
          imageUrls.map((url, index) => (
            <Link key={url} href={`/image/${index}`} passHref>
              <Image
                src={url}
                alt="Multiple Images"
                width={200}
                height={384}
                priority
                style={{ height: "384px", width: "auto" }}
              />
            </Link>
          ))}
      </div>
    );
  };

  return <div className="mt-4">{getImageComponent()}</div>;
};
