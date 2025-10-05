import { lazy } from "react";
import { Link } from "react-router";

const SearchBar = lazy(() => import("./SearchBar"));

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 w-full ">
      <div className="flex items-center justify-center md:justify-between  w-full gap-4">
        <Link to="/" className="text-3xl font-bold text-primary flex-shrink-0 ">
          MovieApp
        </Link>

        <div className="flex-1 md:max-w-[50%] md:mx-auto">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
