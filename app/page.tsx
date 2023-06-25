import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/api";

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

export default async function Home() {
  const popularMovies = await getPopularMovies();
  const topRatedMovies = await getTopRatedMovies();
  const upcomingMovies = await getUpcomingMovies();
  return (
    <main>
      <Navbar />
      <Hero />
      <section className="px-8 md:px-12 lg:px-16 mt-16 mb-32 space-y-16">
        <Category
          title="Películas Populares"
          size={Size.large}
          videos={popularMovies}
        />
        <Category
          title="Mejor calificadas"
          size={Size.medium}
          videos={topRatedMovies}
        />
        <Category title="Películas" size={Size.small} videos={upcomingMovies} />
      </section>
    </main>
  );
}
