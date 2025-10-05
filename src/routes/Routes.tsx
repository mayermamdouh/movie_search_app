import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const MovieDetails = lazy(() => import("../pages/MovieDetails"));
import Layout from "../Layout";
import { lazy, Suspense } from "react";
import CircleLoader from "../components/CircleLoader";

export default function AppRoutes() {
  return (
    <Routes>
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen">
            <CircleLoader />
          </div>
        }
      >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
      </Suspense>
    </Routes>
  );
}
