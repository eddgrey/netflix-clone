export type MovieCard = {
  id: number;
  title: string;
  imageUrl: string;
};

export type Video = {
  name: string;
  key: string;
};

type Actor = {
  name: string;
  character: string;
  imageUrl: string;
};

export type MovieDetails = {
  id: string;
  title: string;
  overview: string;
  year: string;
  duration: number;
  score: number;
  backdropUrl: string;
  genres: string[];
  trailer: Video;
  productionCompanies: { name: string; imageUrl: string }[]
}

export type Movie = {
  details: MovieDetails;
  videos: Video[]
  images: string[]
  cast: Actor[];
};

export type FilterForm = {
  genres: string,
  year: string,
  sortBy: string
}