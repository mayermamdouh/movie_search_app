import { useEffect, useState } from "react";
import type { Movie } from "../api/movieAPI";
import { fetchMovies } from "../api/movieAPI";
import { toast } from "sonner";
import { CategorySection } from "./CategorySection";

const categories = ["horror", "action", "drama", "comedy"];

export interface CategoryState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export default function MoviesSection() {
  const [moviesByCategory, setMoviesByCategory] = useState<
    Record<string, CategoryState>
  >({});

  const fetchCategoryMovies = async (category: string) => {
    setMoviesByCategory((prev) => ({
      ...prev,
      [category]: { movies: [], loading: true, error: null },
    }));

    try {
      const movies = await fetchMovies(category);

      setMoviesByCategory((prev) => ({
        ...prev,
        [category]: {
          movies,
          loading: false,
          error: movies.length ? null : "No movies found",
        },
      }));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setMoviesByCategory((prev) => ({
        ...prev,
        [category]: { movies: [], loading: false, error: message },
      }));
      toast.error(`Failed to load ${category}: ${message}`);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      await Promise.all(categories.map(fetchCategoryMovies));
    };
    loadMovies();
  }, []);

  return (
    <div className="flex flex-col gap-8 container mx-auto p-4">
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          state={moviesByCategory[category]}
        />
      ))}
    </div>
  );
}
