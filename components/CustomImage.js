"use client";
import Image from "next/image";

const CustomImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      // layout="responsive"
      width={width}
      height={height}
      priority={priority}
    />
  );
};

export default CustomImage;
