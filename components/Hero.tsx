"use client";

import {
  CalendarDaysIcon,
  ClockIcon,
  PlayIcon,
  StarIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

import Modal from "./Modal";
import { MovieDetails } from "@/lib/types";
import { useUser } from "@/providers/userProvider";
interface Props {
  details: MovieDetails;
}

export default function Hero({ details }: Props) {
  const { title, overview, backdropUrl, genres, score, year, duration, id } =
    details;
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const hasTrailer = !!details.trailer?.key;
  const { favorites, setFavorites, videosWatched, setVideosWatched } =
    useUser();
  const isFavorite =
    favorites.filter((favorite) => String(favorite.id) === id).length === 1;
  const [videoKey, setVideoKey] = useState(details.trailer?.key);

  const handleFavorite = (id: string) => {
    if (isFavorite) {
      setFavorites(favorites.filter((favorite) => String(favorite.id) !== id));
    } else {
      setFavorites([
        ...favorites,
        { id: Number(id), imageUrl: details.backdropUrl, title },
      ]);
    }
  };

  const watchVideo = () => {
    const video = details.trailer.key;
    if (!videosWatched.includes(video)) {
      setVideosWatched([...videosWatched, video]);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url("${backdropUrl}")` }}
      className={`hero min-h-[85vh] w-screen mb-16`}
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
            className="btn btn-primary disabled:bg-primary/70 disabled:text-primary-content/40"
            disabled={!hasTrailer}
            onClick={() => {
              setVideoKey(details.trailer.key);
              watchVideo();
              modalRef.current!.showModal();
            }}
          >
            <PlayIcon className="h-5" />
            <span>Ver Trailer</span>
          </button>
          <button className="btn btn-accent" onClick={() => handleFavorite(id)}>
            {isFavorite ? (
              <HeartIcon className="h-5" />
            ) : (
              <HeartIconOutline className="h-5" />
            )}
            <span>Favorito</span>
          </button>
        </div>
      </div>

      {hasTrailer && (
        <Modal
          modalRef={modalRef}
          videoKey={videoKey}
          setVideoKey={setVideoKey}
        />
      )}
    </div>
  );
}
