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
        <div className="mx-auto mb-16 w-full">
          <form className="w-full">
            <div className="relative w-full">
              <input
                className="lg:w-7xl w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
                type="search"
                placeholder="Search for movies or shows..."
                aria-label="Search movies"
                onChange={(e) => handleSearch(e)}
              />
            </div>
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
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-300 ${
          isModalOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full max-w-3xl overflow-hidden bg-white shadow-2xl ring-1 ring-gray-900/10 dark:bg-gray-900 dark:ring-white/10 max-h-[90vh] flex flex-col md:flex-row">
          {/* Poster Section */}
          <div className="relative md:w-2/5 aspect-[2/3] md:aspect-auto bg-gray-100 dark:bg-gray-800 flex-shrink-0">
            <img
              src={
                clickedShow?.image?.original ||
                clickedShow?.image?.medium ||
                "https://via.placeholder.com/400x600?text=No+Image"
              }
              alt={clickedShow?.name || "Show poster"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
            <div className="absolute top-3 left-3 md:hidden rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
              ★ {clickedShow?.rating?.average || "N/A"}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-6 md:p-8 overflow-y-auto">
            {/* Header & Close Button */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
                  {clickedShow?.type} • {clickedShow?.language}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {clickedShow?.name}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {clickedShow?.rating?.average && (
                <span className="hidden md:inline-flex items-center gap-1 rounded-lg bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                  ★ {clickedShow.rating.average} / 10
                </span>
              )}
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {clickedShow?.premiered
                  ? clickedShow.premiered.substring(0, 4)
                  : "TBA"}{" "}
                {clickedShow?.ended
                  ? `- ${clickedShow.ended.substring(0, 4)}`
                  : ""}
              </span>
              <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {clickedShow?.runtime || clickedShow?.averageRuntime || "N/A"}{" "}
                mins
              </span>
              <span
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${clickedShow?.status === "Ended" ? "bg-red-500/10 text-red-600 dark:text-red-400" : "bg-green-500/10 text-green-600 dark:text-green-400"}`}
              >
                {clickedShow?.status}
              </span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {clickedShow?.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Summary */}
            <div className="mb-6 flex-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {clickedShow?.summary ? (
                <div
                  dangerouslySetInnerHTML={{ __html: clickedShow.summary }}
                />
              ) : (
                <p>No summary available for this show.</p>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto">
              <span className="text-xs text-gray-400">
                Network:{" "}
                <strong className="text-gray-700 dark:text-gray-200">
                  {clickedShow?.network?.name || "N/A"}
                </strong>
              </span>
              {clickedShow?.officialSite && (
                <a
                  href={clickedShow.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Official Site →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
