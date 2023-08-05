import Category from "@/components/Category";
import Hero from "@/components/Hero";
import {
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/api";

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

async function getHeroMovie() {
  const result = await getMovieDetails("502356")

  return result
}

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();
  const heroMovie = await getHeroMovie();
  // console.log(popularMovies);
  return (
    <main>
      <Hero details={heroMovie.details} />
      <section className="px-8 md:px-12 lg:px-16 mt-16 mb-32 space-y-16">
        <Category
          title="Películas Populares"
          size={Size.large}
          movies={popularMovies}
        />
        <Category
          title="Mejor calificadas"
          size={Size.medium}
          movies={topRatedMovies}
        />
        <Category title="Películas" size={Size.small} movies={topRatedMovies} />
      </section>
    </main>
  );
}
