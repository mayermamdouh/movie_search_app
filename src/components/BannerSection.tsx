import { useState } from "react";
import type { Movie } from "../api/movieAPI";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export default function BannerSection({ movies }: { movies: Movie[] }) {
  const [current, setCurrent] = useState(0);
  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden min-h-[400px]">
      <Carousel className="w-full">
        <CarouselContent className="h-[50vh] md:h-[70vh]">
          {movies.map((movie, index) => (
            <CarouselItem
              key={movie.imdbID}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <img
                src={movie.Poster?.replace("SX300", "SX1300")}
                alt={movie.Title || "No title"}
                className="w-full h-full object-cover"
                width={1300}
                height={700}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
                <div className="absolute inset-0 bg-black/20"></div>
                <h1 className="relative text-lg md:text-4xl font-bold mb-4 drop-shadow-md">
                  {movie.Title || "No title"}
                </h1>
                <p className="relative text-md md:text-3xl drop-shadow-md font-bold">
                  {movie.Year || "No year"}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + movies.length) % movies.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground rounded-full cursor-pointer"
        >
          <MdArrowBackIosNew className="text-3xl drop-shadow-md" />
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % movies.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2  text-primary-foreground rounded-full cursor-pointer"
        >
          <MdArrowForwardIos className="text-3xl drop-shadow-md" />
        </button>
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 drop-shadow-md">
        {movies.map((movie, index) => (
          <button
            key={movie.imdbID}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer w-6 h-1 rounded-full transition-all ${
              current === index ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
