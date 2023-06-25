interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  imageUrl: string;
}

async function fetchData(URL: string) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const data = await fetch(`https://${URL}&api_key=${TMDB_API_KEY}`);
  const { results: movies } = await data.json();

  return movies;
}

async function getMovies(URL: string) {
  const BASE_URL = "api.themoviedb.org/3/movie";
  const movies = await fetchData(BASE_URL + URL);

  return movies.map(
    ({ id, title, overview, release_date, poster_path }) =>
      ({
        id,
        title,
        overview,
        releaseDate: release_date,
        imageUrl: "https://image.tmdb.org/t/p/original" + poster_path,
      } as Movie)
  );
}

export async function getPopularMovies() {
  const URL = "/popular?language=es&page=1";
  const movies = await getMovies(URL);
  return movies;
}

export async function getTopRatedMovies() {
  const URL = "/top_rated?language=es&page=1";
  const movies = await getMovies(URL);
  return movies;
}
export async function getUpcomingMovies() {
  const URL = "/upcoming?language=es&page=1";
  const movies = await getMovies(URL);
  return movies;
}
