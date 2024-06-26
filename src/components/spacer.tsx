import React from "react";

const Spacer = ({
  height = 2,
  width = 2,
}: {
  height?: number;
  width?: number;
}) => {
  return <div className={`h-[${height}px] w-[${width}px]`}></div>;
};

export default Spacer;
