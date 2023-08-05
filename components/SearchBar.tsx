"use client"

import { searchMovies } from "@/lib/api";
import { MovieCard } from "@/lib/types";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<MovieCard[]>([])

    console.log({ results })

    const search = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setResults(await searchMovies(query))
    }
    return (
        <form className="relative dropdown" onSubmit={search}>
            <input type="text" placeholder="Buscar..." className="input input-secondary pl-12" value={query} onChange={(e) => setQuery(e.target.value)} />
            <label tabIndex={0} className="btn btn-ghost absolute ">
                <MagnifyingGlassIcon className="h-6" />
            </label>
            <ul className="dropdown-content menu bg-secondary rounded-box min-w-max shadow p-0">
                {results.map(({ id, imageUrl, title }) => (
                    <li key={id} className="flex space-x-4">
                        <a href={`/movie/${id}`}>
                            <Image src={imageUrl} alt={title} height={24} width={48} className="object-cover" />
                            <p>{title}</p>
                        </a>
                    </li>))}
                {results.length > 0 && <button className="btn btn-primary">Ver todo</button>}
            </ul>
        </form>
    )
} 