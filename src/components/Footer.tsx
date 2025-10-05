import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full p-10">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-bold mb-2">MovieApp</h2>
          <p className="text-secondary">
            Discover movies, check ratings, and get detailed information about
            your favorite films.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center text-secondary">
          <h2 className="text-xl font-bold mb-2 text-white">Quick Links</h2>
          <Link to="#" className="hover:text-primary">
            Home
          </Link>
          <Link to="#" className="hover:text-primary">
            Search
          </Link>
          <Link to="#" className="hover:text-primary">
            Genres
          </Link>
          <a href="#" className="hover:text-primary">
            Top Rated
          </a>
        </div>

        <div className="flex flex-col gap-2 items-center text-secondary">
          <h2 className="text-xl font-bold mb-2 text-white">Contact</h2>
          <span>Email: support@movieapp.com</span>
          <span>Phone: +20 1210567733</span>
          <div className="flex gap-3 mt-5">
            <Link to="#" className="hover:text-primary">
              Facebook
            </Link>
            <Link to="#" className="hover:text-primary">
              Twitter
            </Link>
            <Link to="#" className="hover:text-primary">
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 flex flex-col">
        <hr></hr>
        <div className="mt-4">
          {" "}
          &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
