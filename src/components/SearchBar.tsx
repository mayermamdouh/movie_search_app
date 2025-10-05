import { useState, useEffect, useCallback } from "react";
import type { Movie } from "../api/movieAPI";
import { fetchMovies } from "../api/movieAPI";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import CircleLoader from "./CircleLoader";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const savedSearch = sessionStorage.getItem("searchQuery");
    const savedResults = sessionStorage.getItem("searchResults");
    if (savedSearch && savedResults) {
      setSearch(savedSearch);
      setMovies(JSON.parse(savedResults));
    }
  }, []);

  const searchMovies = useCallback(async () => {
    if (!debouncedSearch.trim()) {
      setMovies([]);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const results = await fetchMovies(debouncedSearch);
      if (!results || results.length === 0) {
        setMovies([]);
        setError("No results found");
      } else {
        setMovies(results);
        sessionStorage.setItem("searchQuery", debouncedSearch);
        sessionStorage.setItem("searchResults", JSON.stringify(results));
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      if (message !== "No results found") {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    searchMovies();
  }, [debouncedSearch, searchMovies]);

  const handleCloseSearch = () => {
    setSearch("");
    setMovies([]);
    setError(null);
    sessionStorage.removeItem("searchQuery");
    sessionStorage.removeItem("searchResults");
  };

  const handleCloseMobileSearch = () => {
    setMobileOpen(false);
    handleCloseSearch();
  };

  return (
    <div className="relative">
      <div className="hidden md:block">
        <div className="relative flex items-center ">
          {search ? (
            <FaTimes
              className="absolute right-3 text-secondary cursor-pointer"
              onClick={handleCloseSearch}
            />
          ) : (
            <FaSearch className="absolute right-3 text-secondary" />
          )}
          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </div>

      <div className="block md:hidden" onClick={() => setMobileOpen(true)}>
        <FaSearch className="text-white ml-auto text-lg cursor-pointer" />
      </div>

      {mobileOpen && (
        <SearchMobile
          mobileOpen={mobileOpen}
          search={search}
          setSearch={setSearch}
          handleCloseMobileSearch={handleCloseMobileSearch}
          loading={loading}
          error={error}
          movies={movies}
        />
      )}

      {search && !mobileOpen && (
        <div className="hidden md:block absolute mt-2 left-0 w-full bg-background border border-secondary rounded-lg max-h-[50vh] overflow-y-auto z-50 invisible-scrollbar">
          {loading ? (
            <div className="p-2 text-center my-10">
              <CircleLoader />
            </div>
          ) : error ? (
            <div className="p-2 text-center text-white">{error}</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                onClick={handleCloseSearch}
              >
                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-800">
                  <img
                    src={movie.Poster || "/placeholder.png"}
                    alt={movie.Title || "No title"}
                    className="rounded-2xl h-20 w-16 shadow-xs shadow-primary text-sm object-cover"
                  />
                  <div
                    className="p-2 text-white text-sm font-medium"
                    onClick={() => setSearch(movie.Title || "")}
                  >
                    {movie.Title || "No title"} ({movie.Year || "No year"})
                  </div>
                </div>
              </Link>
            ))
          ) : null}
        </div>
      )}
    </div>
  );
}

const SearchMobile = ({
  mobileOpen,
  search,
  setSearch,
  handleCloseMobileSearch,
  loading,
  error,
  movies,
}: {
  mobileOpen: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleCloseMobileSearch: () => void;
  loading: boolean;
  error: string | null;
  movies: Movie[];
}) => {
  return (
    <div className="fixed inset-0 z-50 block md:hidden pointer-events-none">
      <div
        className={`
      absolute top-0 left-0 right-0 bg-background p-4 overflow-y-auto 
      transform transition-transform duration-500 ease-in-out 
      rounded-b-2xl shadow-2xl
      ${mobileOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0"}
    `}
      >
        <div className="w-full relative mb-4">
          <SearchInput search={search} setSearch={setSearch} />
          <FaTimes
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer text-lg"
            onClick={handleCloseMobileSearch}
          />
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto invisible-scrollbar">
          {loading ? (
            <div className="flex justify-center my-10">
              <CircleLoader />
            </div>
          ) : error ? (
            <div className="text-center text-white py-4">{error}</div>
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movie/${movie.imdbID}`}
                onClick={handleCloseMobileSearch}
              >
                <div className="flex items-center p-3 cursor-pointer hover:bg-gray-800 rounded-lg transition-colors">
                  <img
                    src={movie.Poster || "/placeholder.png"}
                    alt={movie.Title || "No title"}
                    className="rounded-2xl h-20 w-16 object-cover"
                  />
                  <div className="p-2 text-white text-sm font-medium">
                    {movie.Title || "No title"} ({movie.Year || "No year"})
                  </div>
                </div>
              </Link>
            ))
          ) : search ? (
            <div className="text-center text-gray-400 py-4">
              No movies found
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const SearchInput = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search movies..."
      className="w-full p-2 rounded-lg border border-secondary outline-none bg-background text-white"
    />
  );
};
