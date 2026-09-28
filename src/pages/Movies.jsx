import { useEffect, useState } from "react";

function Movies() {
  const [shows, setShows] = useState([]);
  const [loadingShows, setLoadingShows] = useState(false);
  const [error, setError] = useState(null);

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

  if (loadingShows) {
    return <div className="movies">Loading shows...</div>;
  }

  if (error) {
    return <div className="movies">Error: {error}</div>;
  }

  console.log(shows);

  return (
    <div className="movies container mx-auto px-4 py-12 max-w-7xl">
      {/* --- Search Section --- */}
      <div className="mx-auto mb-16 max-w-2xl">
        <form
          className="flex w-full gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1">
            <input
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-5 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500"
              type="search"
              placeholder="Search for movies or shows..."
              aria-label="Search movies"
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
        {shows.slice(0, 20).map((show, idx) => (
          <div
            key={show?.id}
            className="group flex flex-col overflow-hidden  bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800 dark:ring-gray-700"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                // Adding a fallback image just in case the API misses one
                src={
                  show?.image?.original ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={show?.name || "Movie poster"}
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Ranking Badge */}
              <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-bold tracking-wide text-white backdrop-blur-md">
                #{idx + 1}
              </span>

              {/* Hover Details (Appears on hover) */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-medium text-gray-300 line-clamp-2">
                  {show?.genres?.join(" • ") || "Uncategorized"}
                </p>
              </div>
            </div>

            {/* Card Text Content */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <h2
                className="truncate text-base font-bold text-gray-900 dark:text-white"
                title={show?.name}
              >
                {show?.name}
              </h2>

              {/* Footer details: Year & Rating (Available in TVMaze API) */}
              <div className="mt-1.5 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>{show?.premiered?.substring(0, 4) || "TBA"}</span>

                {show?.rating?.average && (
                  <span className="flex items-center gap-1 text-yellow-500">
                    ★ {show.rating.average}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
