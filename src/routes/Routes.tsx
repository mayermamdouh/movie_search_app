import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout";
import { lazy, Suspense } from "react";
import CircleLoader from "../components/CircleLoader";

const MovieDetails = lazy(() => import("../pages/MovieDetails"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-screen">
          <CircleLoader />
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
