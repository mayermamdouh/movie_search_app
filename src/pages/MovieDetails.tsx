import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, type Movie } from "../api/movieAPI";
import CircleLoader from "../components/CircleLoader";
import { toast } from "sonner";

export interface Rating {
  Source: string;
  Value: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const getMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchMovieDetails(id);

        if (!data || data.Response === "False") {
          setError("Movie not found");
          toast.error("Movie not found");
        } else {
          setMovie(data);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircleLoader />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center w-full h-screen text-white text-center p-4">
        <p>{error}</p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center w-full h-screen text-white">
        Movie data unavailable
      </div>
    );

  const infoRows: [string, string?][] = [
    ["Rated", movie.Rated],
    ["Released", movie.Released],
    ["Runtime", movie.Runtime],
    ["Genre", movie.Genre],
    ["Director", movie.Director],
    ["Writer", movie.Writer],
    ["Actors", movie.Actors],
    ["Language", movie.Language],
    ["Country", movie.Country],
    ["Awards", movie.Awards],
    ["Metascore", movie.Metascore],
    ["IMDB Rating", movie.imdbRating],
    ["IMDB Votes", movie.imdbVotes],
    ["Type", movie.Type],
  ];

  return (
    <div className="relative w-full min-h-screen text-white">
      <div
        className="absolute inset-0 bg-black/50 z-0 blur-xs bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.Poster?.replace("SX300", "SX600")})`,
        }}
      />
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center max-w-6xl mx-auto p-6 gap-6 ">
        <img
          src={movie.Poster}
          alt={movie.Title || "No title"}
          className="w-full md:w-[30%] h-[450px]  md:h-[600px] object-cover rounded-2xl shadow-xl flex-shrink-0"
          width={400}
          height={600}
          loading="lazy"
        />

        <div className="w-full md:w-[70%] bg-gray-900/70 rounded-2xl p-4 flex flex-col gap-3 shadow-md">
          <h1 className="text-2xl font-bold">{movie.Title}</h1>
          <div className="flex flex-wrap gap-4 items-center justify-center text-secondary text-sm ">
            <span>{movie.Year}</span>
            <span>{movie.Genre}</span>
            <span>{movie.Runtime}</span>
          </div>

          <div className="mt-2">
            <p>{movie.Plot}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {infoRows.map(([label, value], index) => (
              <div
                key={index}
                className="flex flex-col justify-between border-b border-primary pb-1"
              >
                <span className="font-semibold">{label}</span>
                <span className="text-secondary">{value || "N/A"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
