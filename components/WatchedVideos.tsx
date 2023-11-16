"use client";

import { useUser } from "@/providers/userProvider";

export default function WatchedVideos() {
  const { videosWatched } = useUser();

  if (videosWatched.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-3xl font-medium mb-4">Siguir viendo</h3>
      <ul className="carousel w-full">
        {videosWatched.map((video) => (
          <li key={video} className="carousel-item hover:cursor-pointer mr-3">
            <iframe
              key={video}
              width="480"
              height="300"
              src={`https://www.youtube.com/embed/${video}?autoplay=0&rel=0`}
              className="rounded-lg"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
