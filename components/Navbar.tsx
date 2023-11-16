"use client";

import NavLink from "./NavLink";
import NetflixIcon from "@/public/images/netflix-icon.svg";
import { Bars3CenterLeftIcon, UserIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar";
import { useUser } from "@/providers/userProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { user, setUser } = useUser();

  if (pathname === "/login") {
    return null;
  }

  return (
    <nav className="navbar justify-between fixed bg-base-100/80 px-8 md:px-12 lg:px-16 h-[10vh] z-50">
      <div className="lg:navbar-start lg:uppercase font-light">
        <div className="lg:hidden dropdown dropdown-bottom">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <Bars3CenterLeftIcon className="h-8" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content w-max py-4 px-6 md:py-6 md:px-8 space-y-2 md:space-y-4 rounded-box shadow bg-base-100/95"
          >
            <NavLink href="/" text="Inicio" />
            <NavLink href="/discover" text="Explorar" />
            <NavLink href="/favorite" text="Favorito" />
            {user ? (
              <button
                className="decoration-primary decoration-2 underline-offset-8 hover:underline mt-4"
                onClick={() => setUser(null)}
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="decoration-primary decoration-2 underline-offset-8 hover:underline mt-4"
              >
                Iniciar Sesión
              </Link>
            )}
          </ul>
        </div>
        <ul className="hidden lg:flex space-x-6">
          <NavLink href="/" text="Inicio" />
          <NavLink href="/discover" text="Explorar" />
          <NavLink href="/favorite" text="Favorito" />
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
          <div className="hidden md:flex dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle btn-primary">
              <UserIcon className="h-8 w-8" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content bg-base-100/75 rounded-box min-w-max shadow mt-2 py-6 px-6 md:px-8 space-y-2 md:space-y-4 "
            >
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
        <div className="lg:navbar-end space-x-2 md:space-x-6">
          <SearchBar />
          <Link href="/login" className="hidden md:flex btn btn-primary">
            Iniciar Sesión
          </Link>
        </div>
      )}
    </nav>
  );
}
