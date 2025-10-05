import type { MovieDetails } from "../pages/MovieDetails";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search as Movie[];
    } else {
      throw new Error(data.Error);
    }
  } catch (err: unknown) {
    throw err;
  }
};

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  } catch (err: unknown) {
    throw err;
  }
};
