import { PlayIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  return (
    <div className="hero min-h-[75vh] bg-[url('/images/TheSuperMarioBrosMovie.jpg')]">
      <div className="hero-overlay bg-black/25"></div>
      <div className="hero-content flex-col items-start justify-self-start px-8 md:px-12 lg:px-16">
        <h3 className="text-6xl font-bold">Super Mario Bros</h3>
        <p className="text-xl">
          Información adicionla acerca de la serie/película
        </p>
        <button className="btn btn-primary">
          <PlayIcon className="h-5" />
          <span>Ver</span>
        </button>
      </div>
    </div>
  );
}
