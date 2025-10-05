import { Link } from "react-router";
import type { Movie } from "../api/movieAPI";
import React from "react";

export const MovieCard = React.memo(({ movie }: { movie: Movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div
        className="relative min-w-[150px] md:min-w-[200px] aspect-[2/3] rounded-3xl flex-shrink-0 cursor-pointer 
                   transition-transform duration-300 ease-in-out 
                   hover:scale-105 hover:shadow-2xl overflow-hidden"
      >
        <img
          src={movie.Poster}
          alt={movie.Title || "No title"}
          loading="lazy"
          width={200}
          height={300}
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <h1 className="relative text-sm md:text-base font-bold drop-shadow-md">
            {movie.Title || "No title"}
          </h1>
          <p className="relative text-xs md:text-sm drop-shadow-md font-semibold">
            {movie.Year || "No year"}
          </p>
        </div>
      </div>
    </Link>
  );
});
