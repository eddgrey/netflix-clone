import Hero from "@/components/Hero";
import { getMovieDetails } from "@/lib/api";
import Image from "next/image";


export default async function Movie() {

  const { details, cast, images, videos } = await getMovieDetails("502356");

  console.log(images);

  return (
    <main>
      <Hero details={details} />
      <section className="px-8 md:px-12 lg:px-16 mb-32 space-y-16">
        <div>
          <h3 className="text-xl font-medium tracking-wider mb-4">Elenco Principal</h3>
          <ul className="flex space-x-8 carousel">
            {cast.map(({ name, character, imageUrl }) => (
              <li
                key={name}
                className="carousel-item avatar flex flex-col justify-center items-center"
              >
                <div className="relative h-32 w-32 rounded-full">
                  <Image
                    src={imageUrl}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-medium">{name}</p>
                <p className="text-sm">{character}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium tracking-wider mb-4">Videos</h3>
          <ul className="carousel w-full">
            {videos.map((video) => (
              <li className="carousel-item hover:cursor-pointer mr-3">
                <iframe
                  key={video.key}
                  width="436"
                  height="217"
                  src={`http://www.youtube.com/embed/${video.key}?autoplay=0&rel=0`}
                  className="rounded-lg"
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-medium tracking-wider mb-4">Imágenes</h3>
          <ul className="carousel w-full">
            {images.map(imageUrl => (
              <li className="carousel-item mr-3 relative h-[434px] w-[218px] hover:cursor-pointer">
                <Image src={imageUrl} alt="poster" fill className="object-cover rounded-lg" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
