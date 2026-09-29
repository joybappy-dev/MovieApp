import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

function Movies() {
  const [shows, setShows] = useState([]);
  const [loadingShows, setLoadingShows] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedShow, setClickedShow] = useState({});

  useEffect(() => {
    async function fetchShows() {
      setLoadingShows(true);
      setError(null);

      try {
        const res = await fetch("https://api.tvmaze.com/shows?page=0");

        if (!res.ok) {
          throw new Error(`Failed to fetch shows: ${res.statusText}`);
        }

        const data = await res.json();
        setShows(data);
      } catch (err) {
        console.error("Error fetching shows:", err);
        setError(err.message);
      } finally {
        setLoadingShows(false);
      }
    }

    fetchShows();
  }, []);

  if (error) {
    return <div className="movies">Error: {error}</div>;
  }

  async function handleSearch(e) {
    try {
      setLoadingShows(true);
      setSearch(e.target.value);
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${search}`,
      );
      const data = await res.json();
      const showsData = data?.map((element) => {
        return element?.show;
      });
      setShows(showsData);
    } catch (error) {
      console.error("Error fetching shows: ", error);
    } finally {
      setLoadingShows(false);
    }
  }

  return (
    <div>
      <div className="movies container mx-auto px-4 py-12 max-w-7xl">
        {/* --- Search Section --- */}
        <div className="mx-auto mb-16 max-w-7xl">
          <form className="flex w-full gap-3">
            <div className="relative flex-1">
              <input
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                type="search"
                placeholder="Search for movies or shows..."
                aria-label="Search movies"
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95"
            >
              Search
            </button>
          </form>
        </div>

        {/* --- Responsive Grid Section --- */}
        <div
          className={`${!loadingShows && "grid"} grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6 min-h-screen md:w-7xl`}
        >
          {loadingShows ? (
            <div className="text-4xl text-center animate-bounce mt-64">
              Loading...
            </div>
          ) : (
            shows
              .slice(0, 20)
              .map((show, idx) => (
                <MovieCard
                  key={show?.id}
                  show={show}
                  idx={idx}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  setClickedShow={setClickedShow}
                />
              ))
          )}
        </div>
      </div>

      <div
        className={`px-4 backdrop-blur-sm fixed top-0 h-screen w-full -ml-80 flex justify-center items-center ${isModalOpen ? "block" : "hidden"}`}
      >
        <div className="modal rounded-2xl h-96 w-96 bg-blue-600 opacity-75 p-4">
          <div className="flex justify-between">
            <h1>Movie details</h1>
            <p
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer text-3xl"
            >
              X
            </p>
          </div>
          {/* details here */}
          <p>I am the Movie Details</p>
          <p>{clickedShow?.id}</p>
        </div>
      </div>
    </div>
  );
}

export default Movies;
