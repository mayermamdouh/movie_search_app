import { useEffect, useState } from "react";
import BannerSection from "../components/BannerSection";
import { fetchMovies, type Movie } from "../api/movieAPI";
import MoviesPage from "../components/Movies";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moives = await fetchMovies("movie");
        setMovies(moives);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="overflow-x-hidden">
      <BannerSection movies={movies} />
      <MoviesPage />
    </div>
  );
}
