import { Link } from "react-router";

function Navbar() {
  return (
    <div className="navbar flex justify-between pt-4 px-10">
      <h1 className="text-4xl font-bold">MovieApp</h1>
      <ul>
        <li className="inline-flex items-center justify-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none">
          <Link to="/movies">Movies</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
