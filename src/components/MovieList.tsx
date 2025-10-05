import type { Movie } from "../api/movieAPI";
import { MovieCard } from "./MovieCard";

export default function MovieList({ movies }: { movies: Movie[] }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-white text-center py-8">No movies available</div>
    );
  }

  return (
    <div className="flex gap-3 overflow-x-auto overflow-y-hidden px-2 py-4 w-full invisible-scrollbar will-change-transform">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
