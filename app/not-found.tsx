import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">404 Not Found!</h1>
      <Image
        src="/images/not-found.svg"
        alt="not-found"
        width={540}
        height={540}
      />
    </main>
  );
}
