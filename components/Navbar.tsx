"use client";

import NavLink from "./NavLink";
import NetflixIcon from "@/public/images/netflix-icon.svg";
import Avatar from "@/public/images/avatar.png";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  const [user, setUser] = useState<string | null>(null);

  return (
    <nav className="navbar justify-between fixed bg-gradient-to-b from-black to-[rgba(0,0,0,0)] px-8 md:px-12 lg:px-16 h-[10vh] z-20">
      <div className="lg:navbar-start lg:uppercase font-light">
        <div className="lg:hidden dropdown dropdown-bottom">
          <label
            tabIndex={0}
            className="btn btn-circle btn-ghost hover:bg-base-100/75"
          >
            <Bars3CenterLeftIcon className="h-8" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content py-4 px-6 md:py-6 md:px-8 space-y-2 md:space-y-4 rounded-box shadow bg-base-100/75"
          >
            <NavLink href="/" text="Home" />
            <NavLink href="/movies" text="Películas" />
            <NavLink href="/series" text="Series" />
          </ul>
        </div>
        <ul className="hidden lg:flex space-x-6">
          <NavLink href="/" text="Home" />
          <NavLink href="/movies" text="Películas" />
          <NavLink href="/series" text="Series" />
        </ul>
      </div>
      <div className="lg:navbar-center">
        <Link href="/" className="mx-auto">
          <Image
            src={NetflixIcon}
            alt="Netflix Icon"
            className="w-32 lg:w-40"
          />
        </Link>
      </div>

      {user && (
        <div className="lg:navbar-end space-x-2 md:space-x-6">
          <SearchBar />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle avatar">
              <div className="w-24 rounded-full">
                <Image src={Avatar} alt="avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100/75 rounded-box min-w-max shadow mt-2 py-6 px-6 md:px-8 space-y-2 md:space-y-4 "
            >
              <NavLink href="" text="Mi Lista" />
              <li>
                <button
                  className="decoration-primary decoration-2 underline-offset-8 hover:underline"
                  onClick={() => setUser(null)}
                >
                  Cerrar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!user && (
        <div className="lg:navbar-end">
          <button className="btn btn-primary" onClick={() => setUser("user")}>
            Iniciar Sesión
          </button>
        </div>
      )}
    </nav>
  );
}
