"use client";

import { MovieCard } from "@/lib/types";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type UserProviderProps = {
  children: ReactNode;
};

type UserContextType = {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  favorites: MovieCard[];
  setFavorites: Dispatch<SetStateAction<MovieCard[]>>;
  videosWatched: string[];
  setVideosWatched: Dispatch<SetStateAction<string[]>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<MovieCard[]>([]);
  const [videosWatched, setVideosWatched] = useState<string[]>([]);
  const value = {
    user,
    setUser,
    favorites,
    setFavorites,
    videosWatched,
    setVideosWatched,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("UserProvider undefined");
  }

  return context;
}
