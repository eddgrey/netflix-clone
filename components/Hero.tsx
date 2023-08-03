"use client";
import {
  CalendarDaysIcon,
  ClockIcon,
  PlayIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { useRef } from "react";

import Modal from "./Modal";
import { MovieDetails } from "@/lib/types";
interface Props {
  details: MovieDetails;
}

// https://image.tmdb.org/t/p/original/ddfGBZiyOhVCAOtffie7AiXVYiE.jpg

export default function Hero({ details }: Props) {
  const { title, overview, backdropUrl, genres, score, year, duration } = details;
  const modalRef = useRef<HTMLDialogElement | null>(null);
  return (
    <div
      style={{ backgroundImage: `url("${backdropUrl}")` }}
      className={`hero min-h-[75vh] w-screen mb-16`}
    >
      <div className="hero-overlay bg-black/40"></div>
      <div className="hero-content flex-col items-start justify-self-start space-y-8 px-8 md:px-12 lg:px-16">
        <h3 className="text-6xl font-bold">{title}</h3>
        <div className="space-y-4">
          <div className="space-x-2">
            {genres.map((genre) => (
              <span key={genre} className="badge badge-primary badge-md">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <StarIcon className="h-5 mr-1 text-yellow-300" />
              <p>{score.toFixed(1)}</p>
            </span>
            <span className="flex items-center">
              <ClockIcon className="h-5 mr-1" />
              {duration} min
            </span>
            <span className="flex items-center">
              <CalendarDaysIcon className="h-5 mr-1" />
              {year}
            </span>
          </div>
          <p className="text-lg max-w-3xl">{overview}</p>
        </div>
        <div className="space-x-4">
          <button
            className="btn btn-primary"
            onClick={() => modalRef.current!.showModal()}
          >
            <PlayIcon className="h-5" />
            <span>Ver Trailer</span>
          </button>
          <button className="btn btn-accent">
            <HeartIcon className="h-5" />
            <span>Favorito</span>
          </button>
        </div>
      </div >

      <Modal modalRef={modalRef} trailer={details.trailer} />
    </div >
  );
}
