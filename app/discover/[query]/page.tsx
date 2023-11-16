"use client";

import { searchMovies } from "@/lib/api";
import { MovieCard } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function SearchQuery({ params }: { params: { query: string } }) {
  const query = params.query;
  const [results, setResults] = useState<MovieCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const updateResults = async () => {
      const { resultingMovies, totalResultingPages } = await searchMovies(
        query,
        undefined,
        1
      );
      setResults(resultingMovies);
      setTotalPages(totalResultingPages);

      setPagination(Array.from(new Array(8), (x, i) => i + 1));
      setCurrentPage(1);
    };
    updateResults();
  }, []);

  useEffect(() => {
    async function changePage() {
      const { resultingMovies } = await searchMovies(
        query,
        undefined,
        currentPage
      );
      setResults(resultingMovies);
    }
    changePage();
  }, [currentPage]);

  return (
    <main className="px-8 md:px-12 lg:px-16 pt-36">
      <h2 className="text-4xl font-bold my-12">Búsqueda: {params.query}</h2>
      {results.length > 0 && (
        <div className="flex flex-col justify-center">
          <section className="grid grid-cols-3 md:grid-cols-4 gap-4 min-h-[70vh] w-full mt-24">
            <Link
              key={results[0].id}
              href={`/movie/${results[0].id}`}
              className="col-span-2 row-span-4 relative w-full"
            >
              <div className="absolute h-full w-full bg-gradient-to-t from-black/70 hover:from-black via-secondary/5 to-[rgba(0,0,0,0)] z-10" />
              <Image
                src={results[0].imageUrl}
                alt={results[0].title}
                fill
                className="object-cover rounded-lg"
              />
              <p className="absolute bottom-6 left-2 text-xl tracking-wide z-10">
                {results[0].title}
              </p>
            </Link>
            <Link
              key={results[1].id}
              href={`/movie/${results[1].id}`}
              className="row-span-4 h-[40vh] md:h-full relative w-full"
            >
              <div className="absolute h-full w-full bg-gradient-to-t from-black/70 hover:from-black via-secondary/5 to-[rgba(0,0,0,0)] z-10" />
              <Image
                src={results[1].imageUrl}
                alt={results[1].title}
                fill
                className="object-cover rounded-lg"
              />
              <p className="absolute bottom-6 left-2 text-xl tracking-wide z-10">
                {results[1].title}
              </p>
            </Link>
            {results.slice(2).map(({ id, title, imageUrl }) => (
              <Link
                key={id}
                href={`/movie/${id}`}
                className="row-span-2 relative h-[25vh] w-full"
              >
                <div className="absolute h-full w-full bg-gradient-to-t from-black/70 hover:from-black via-secondary/5 to-[rgba(0,0,0,0)] z-10" />
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover rounded-lg"
                />
                <p className="absolute bottom-4 left-2 text-xl tracking-wide z-10">
                  {title}
                </p>
              </Link>
            ))}
          </section>
          <div className="join mx-auto mt-12 mb-24">
            <button
              className="join-item btn btn-secondary"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              «
            </button>
            {pagination.map((page) => (
              <button
                key={page}
                className={twMerge(
                  "join-item btn btn-secondary",
                  page === currentPage ? "btn-active" : ""
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="join-item btn btn-secondary"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
