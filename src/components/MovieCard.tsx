import { Link } from "react-router";
import type { Movie } from "../api/movieAPI";
import React from "react";

export const MovieCard = React.memo(({ movie }: { movie: Movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div
        className="relative min-w-[150px] md:min-w-[200px] h-[200px] md:h-[250px] rounded-3xl flex-shrink-0 cursor-pointer 
                transition-transform duration-300 ease-in-out 
                hover:scale-105 hover:shadow-2xl"
      >
        <img
          src={movie.Poster.replace("SX300", "SX200")}
          alt={movie.Title || "No title"}
          loading="lazy"
          width={200}
          height={250}
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
          <h1 className="relative text-ms font-bold drop-shadow-md">
            {movie.Title || "No title"}
          </h1>
          <p className="relative text-sm drop-shadow-md font-bold">
            {movie.Year || "No year"}
          </p>
        </div>
      </div>
    </Link>
  );
});
