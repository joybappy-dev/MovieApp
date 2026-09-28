import { Link } from "react-router";

function Navbar() {
  return (
    <div className="navbar flex justify-between pt-4 px-10">
      <h1 className="text-4xl font-bold">
        <Link to="/">MovieApp</Link>
      </h1>

      <Link to="/movies">
        <button className="inline-flex items-center justify-center rounded-full border border-gray-800 bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:#24486c focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none cursor-pointer">
          Movies
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
