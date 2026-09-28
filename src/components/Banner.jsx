import { Link } from "react-router";

function Banner() {
  return (
    <div className="banner">
      <section class="lg:grid lg:h-screen lg:place-content-center ">
        <div class="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">
          <div class="max-w-prose text-left">
            <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
              Find Movies And Shows In Minutes
            </h1>

            <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
              It's easy to find your favourite movies from all around the world.
              Get your favourite movies now. Don't be late. Explore now below.
            </p>

            <div class="mt-4 flex gap-4 sm:mt-6">
              <Link to="/movies">
                <button className="inline-flex items-center justify-center rounded-full border border-gray-800 bg-gray-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:#24486c focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none cursor-pointer">
                  Explore Movies
                </button>
              </Link>
            </div>
          </div>

          <img src="/movie_logo.png" alt="logo" />
        </div>
      </section>
    </div>
  );
}

export default Banner;
