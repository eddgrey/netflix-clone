"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type Video = {
  id: string;
  imageUrl: string;
};

interface Props {
  video: Video;
  width: number;
  height: number;
}

export default function Card({ video, width, height }: Props) {
  const router = useRouter();
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => router.push(`video/${video.id}`)}
      className="carousel-item mr-1 hover:cursor-pointer"
    >
      <Image
        src={video.imageUrl}
        alt=""
        width={width}
        height={height}
        className="object-cover"
      />
    </motion.div>
  );
}
