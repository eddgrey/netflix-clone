"use client";

import { searchMovies } from "@/lib/api";
import { MovieCard } from "@/lib/types";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieCard[]>([]);

  const search = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { resultingMovies } = await searchMovies(query, 6);
    setResults(resultingMovies);
  };

  return (
    <form className="relative dropdown" onSubmit={search}>
      <input
        type="text"
        placeholder="Buscar..."
        className="input input-ghost input-primary pl-12"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        tabIndex={0}
        className="btn btn-ghost absolute right-0"
      >
        <MagnifyingGlassIcon className="h-6" />
      </button>
      <ul className="dropdown-content menu bg-base-100/95 rounded-box min-w-max w-full shadow p-0">
        {results.length === 0 ? (
          <div className="h-24 flex items-center justify-center">
            No hay resultados
          </div>
        ) : (
          <>
            {results.map(({ id, imageUrl, title }) => (
              <li key={id} className="flex space-x-4">
                <a href={`/movie/${id}`}>
                  <Image
                    src={imageUrl}
                    alt={title}
                    height={32}
                    width={56}
                    className="object-cover"
                  />
                  <p className="truncate">{title}</p>
                </a>
              </li>
            ))}

            <Link href={`/discover/${query}`} className="btn btn-primary">
              Ver todo
            </Link>
          </>
        )}
      </ul>
    </form>
  );
}
