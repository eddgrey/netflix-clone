"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MovieCard } from "@/lib/types";
interface Props {
  movie: MovieCard;
  width: number;
  height: number;
}

export default function Card({ movie, width, height }: Props) {
  const router = useRouter();
  const { id, imageUrl } = movie;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => router.push(`movie/${id}`)}
      className="carousel-item mr-1 hover:cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={movie.title}
        width={width}
        height={height}
        className="object-cover"
      />
    </motion.div>
  );
}
