import { Movie, MovieCard } from "./types";


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original"

async function fetchData(URL: string) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const data = await fetch(`https://${URL}&api_key=${TMDB_API_KEY}`);
  const dataJson = await data.json();
  // console.log(dataJson);
  return dataJson;
}

async function getMovies(URL: string): Promise<MovieCard[]> {
  const BASE_URL = "api.themoviedb.org/3/movie";
  const { results: data } = await fetchData(BASE_URL + URL);
  const movies = data.map(({ id, title, poster_path }) => ({
    id,
    title,
    imageUrl: IMAGE_BASE_URL + poster_path,
  }));

  return movies;
}

export async function getMovieDetails(movieId: string): Promise<Movie> {
  const URL = `api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,images,credits&language=es-MX`;
  const details = await fetchData(URL);
  // const img = await fetchData(`api.themoviedb.org/3/movie/${movieId}/images`)
  // console.log(img);
  const videos = details.videos.results.map((video) => ({
    name: video.name,
    type: video.type,
    key: video.key,
  }));

  const posters = details.images.posters.map(poster => IMAGE_BASE_URL + poster.file_path)

  console.log(details.images)

  const trailer = videos.filter((video) => video.type === "Trailer")
  const teaser = videos.filter((video) => video.type === "Teaser")
  const clip = videos.filter((video) => video.type === "Clip")

  const cast = details.credits.cast
    .filter((person) => person.known_for_department === "Acting")
    .map((actor) => ({
      name: actor.name,
      imageUrl: IMAGE_BASE_URL + actor.profile_path,
      character: actor.character,
    }))

  return {
    details: {
      title: details.title,
      overview: details.overview,
      year: details.release_date.split("-")[0],
      duration: details.runtime,
      score: details.vote_average,
      backdropUrl:
        IMAGE_BASE_URL + details.backdrop_path,
      genres: details.genres.map((genre) => genre.name),
      trailer: trailer[0],
      productionCompanies: details.production_companies.map(company => ({ name: company.name, imageUrl: IMAGE_BASE_URL + company.logo_path }))
    },
    videos: [...trailer, ...teaser, ...clip],
    images: posters,
    cast,
  };
}

export async function getPopularMovies() {
  const URL = "/popular?language=es-MX&page=1";
  const movies = await getMovies(URL);
  // console.log(movies);
  return movies;
}

export async function getTopRatedMovies() {
  const URL = "/top_rated?language=es-MX&page=1";
  const movies = await getMovies(URL);
  return movies;
}
export async function getUpcomingMovies() {
  const URL = "/upcoming?language=es-MX&page=1";
  const movies = await getMovies(URL);
  return movies;
}
