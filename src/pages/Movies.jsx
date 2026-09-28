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
    <div className="movies">
      <div className="flex gap-5 my-20">
        <input
          className="border-2 w-full rounded-md"
          type="search"
          name=""
          id=""
        />
        <button className="border-2 p-2 rounded-md">Search</button>
      </div>

      <div className="movie-list flex flex-wrap gap-5">
        {shows.slice(0, 20).map((show, idx) => (
          <div className="show-card w-60 h-96" key={show?.id}>
            <p>
              {idx + 1}. {show?.name}
            </p>
            <img
              className="w-full h-full"
              src={show?.image?.original}
              alt="show poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
