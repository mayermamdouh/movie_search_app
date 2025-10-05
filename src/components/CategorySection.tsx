import CircleLoader from "./CircleLoader";
import MovieList from "./MovieList";
import type { CategoryState } from "./Movies";

export function CategorySection({
  category,
  state,
}: {
  category: string;
  state: CategoryState | undefined;
}) {
  return (
    <section role="region" aria-label={`${category} movies`} className="mb-8">
      <h2
        role="heading"
        aria-level={2}
        className="text-3xl font-bold mb-2 capitalize text-primary-foreground text-left"
      >
        {category} movies
      </h2>

      {state?.loading ? (
        <div className="flex justify-center my-10">
          <CircleLoader />
        </div>
      ) : state?.error ? (
        <div className="text-white text-center py-4">{state.error}</div>
      ) : state?.movies.length ? (
        <MovieList movies={state.movies} />
      ) : (
        <div className="text-white text-center py-4">No movies available</div>
      )}
    </section>
  );
}
