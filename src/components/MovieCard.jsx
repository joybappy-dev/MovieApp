function MovieCard({ show, idx, setIsModalOpen, setClickedShow }) {
  function handleMovieCardClick(show) {
    console.log(show.id);
    setClickedShow(show);
    setIsModalOpen(true);
  }
  return (
    <div
      onClick={() => handleMovieCardClick(show)}
      className="card cursor-pointer group flex flex-col overflow-hidden  bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800 dark:ring-gray-700 h-fit"
    >
      {/* Image Wrapper */}
      <div className="relative aspect-2/3 w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
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
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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
  );
}

export default MovieCard;
