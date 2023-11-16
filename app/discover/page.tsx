"use client";

import { discoverMovies } from "@/lib/api";
import { FilterForm, MovieCard } from "@/lib/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { genres } from "@/constants";
import Link from "next/link";

export default function Discover() {
  const [filters, setFilters] = useState<FilterForm>({
    genres: "",
    year: "",
    sortBy: "popularity.desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<number[]>([]);
  const [results, setResults] = useState<MovieCard[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const changeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    setFilters({ ...filters, [id]: value });
  };

  const discoverMovie = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { resultingMovies, totalResultingPages } = await discoverMovies(
      filters,
      1
    );
    setResults(resultingMovies);
    setTotalPages(totalResultingPages);

    setPagination(Array.from(new Array(8), (x, i) => i + 1));
    setCurrentPage(1);
  };

  useEffect(() => {
    async function changePage() {
      const { resultingMovies } = await discoverMovies(filters, currentPage);
      setResults(resultingMovies);
    }
    changePage();
  }, [currentPage]);

  return (
    <main className="px-8 md:px-12 lg:px-16 pt-36">
      <form className="flex items-end space-x-8" onSubmit={discoverMovie}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Género</span>
          </label>
          <select
            id="genres"
            className="select bg-secondary w-full max-w-xs"
            value={filters.genres}
            onChange={changeFilter}
          >
            <option value="">Todos</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Año</span>
          </label>
          <select
            id="year"
            className="select bg-secondary w-full max-w-xs"
            value={filters.year}
            onChange={changeFilter}
          >
            <option value="">Todos</option>
            {Array.from(
              { length: 30 },
              (value, index) => new Date().getFullYear() - index * 1
            ).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Orden</span>
          </label>
          <select
            id="sortBy"
            className="select bg-secondary w-full max-w-xs"
            value={filters.sortBy}
            onChange={changeFilter}
          >
            <option value="popularity.desc">Popularidad</option>
            <option value="vote_average.desc">Calificación</option>
            <option value="revenue.desc">Recaudación</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-40">
          Buscar
        </button>
      </form>

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
                  sizes="25vw"
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
