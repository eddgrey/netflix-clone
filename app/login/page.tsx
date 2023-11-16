"use client";

import { useUser } from "@/providers/userProvider";
import NetflixIcon from "@/public/images/netflix-icon.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
  const { setUser } = useUser();
  const [input, setInput] = useState("");
  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(input);
    router.push("/");
  };

  return (
    <main
      className="h-screen relative flex justify-center items-center"
      style={{ backgroundImage: `url("/images/bg-login.jpg")` }}
    >
      <div className="absolute h-screen w-screen bg-black/60" />
      <Image
        src={NetflixIcon}
        alt="Netflix Icon"
        className="w-32 lg:w-40 absolute top-4 left-4"
      />

      <form
        className="bg-black/80 rounded-lg px-12 py-12 flex flex-col justify-between gap-24 z-20 w-full max-w-lg"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl">Inicia Sesión</h1>

        <div className="flex flex-col gap-8 h-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="label">
              <span className="label-text text-lg">Nombre de usuario</span>
            </label>
            <input
              type="text"
              placeholder="usuario123"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              minLength={4}
              required
              className="input input-secondary bg-secondary"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </main>
  );
}
