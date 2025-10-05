import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isMovieDetails = location.pathname.startsWith("/movie/");

  return (
    <header className="bg-black text-white px-6 py-4 w-full">
      <div className="flex items-center justify-center md:justify-between w-full gap-4">
        {isMovieDetails && (
          <button
            onClick={() => navigate("/")}
            className="text-xl text-white flex items-center gap-2 md:hidden"
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link
            to="/"
            className="text-3xl font-bold text-primary flex-shrink-0"
          >
            MovieApp
          </Link>
        </div>

        <div className="md:flex-1 justify-center md:max-w-[50%] md:mx-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
