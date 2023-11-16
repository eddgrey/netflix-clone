"use client";

import { useUser } from "@/providers/userProvider";
import { TrashIcon, VideoCameraSlashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function Favorite() {
  const { favorites, setFavorites } = useUser();

  return (
    <main className="pt-[10vh] px-8 md:px-12 lg:px-16 w-screen">
      {favorites.length === 0 ? (
        <div className="flex flex-col gap-4 items-center justify-center h-[90vh] w-full">
          <VideoCameraSlashIcon className="h-12 w-12" />
          <p>No tienes películas favoritas</p>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold my-12">Favorito</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 rounded-lg h-full justify-between w-full">
            {favorites.map(({ id, title, imageUrl }) => (
              <div
                key={id}
                className="relative h-[20rem] w-full rounded-lg flex justify-center"
              >
                <Link href={`/movie/${id}`}>
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-center object-cover rounded-lg"
                  />
                </Link>
                <div className="absolute bottom-0 inset-x-0 bg-black/80 px-2 w-full py-4 flex justify-between">
                  <h3 className="text-lg truncate">{title}</h3>
                  <button
                    className="bg-primary px-2 p-1 rounded-md flex items-center justify-center"
                    onClick={() =>
                      setFavorites(
                        favorites.filter((favorite) => favorite.id !== id)
                      )
                    }
                  >
                    <TrashIcon className="h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
