import { MovieCard } from "@/lib/types";
import Card from "./Card";

enum Size {
  small = "small",
  medium = "medium",
  large = "large",
}

interface Props {
  title: string;
  size: Size;
  movies: MovieCard[];
}

export default function Category({ title, size, movies }: Props) {
  const sizeCard = {
    small: { width: 300, height: 170 },
    medium: { width: 158, height: 280 },
    large: { width: 218, height: 434 },
  };
  const { width, height } = sizeCard[size];
  return (
    <div className="space-y-8">
      <h2 className="text-3xl">{title}</h2>
      <div className="carousel overflow-y-hidden relative">
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} width={width} height={height} />
        ))}
      </div>
    </div>
  );
}
