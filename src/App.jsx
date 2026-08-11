import { useState } from "react";

import AnimeForm from "./AnimeForm";
import AnimeList from "./AnimeList";
import { searchAnime as fetchAnime } from "./api";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [genresInclude, setGenresInclude] = useState("");
  const [genresExclude, setGenresExclude] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [sort, setSort] = useState("");

  const searchAnime = async (
    query,
    type,
    genresInclude,
    genresExclude,
    status,
    rating,
    orderBy,
    sort,
    page = 1
  ) => {
    setIsLoading(true);

    // Limit request to 1 per second
    // const last_request = localStorage.getItem('last_request')
    // if (last_request && new Date().getTime() - last_request < 1000) {
    //   alert('Please wait a second before requesting again');
    //   return null;
    // } else {
    //   localStorage.setItem('last_request', new Date().getTime())
    // }

    let params = {
      page: page,
      q: query,
      type: type,
      genres: genresInclude,
      genres_exclude: genresExclude,
      status: status,
      rating: rating,
      order_by: orderBy,
      sort: sort,
      limit: 20,
    };

    // Filter keys with empty values as the API throws error 500 for empty params
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    await fetchAnime(params)
      .then((res) => {
        setQuery(res.config.params.q);
        setType(res.config.params.type);
        setGenresInclude(res.config.params.genres);
        setGenresExclude(res.config.params.genres_exclude);
        setStatus(res.config.params.status);
        setRating(res.config.params.rating);
        setOrderBy(res.config.params.order_by);
        setSort(res.config.params.sort);

        setSearchResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handlePageChange = (page) => {
    searchAnime(
      query,
      type,
      genresInclude,
      genresExclude,
      status,
      rating,
      orderBy,
      sort,
      page
    );
  };

  return (
    <div className="mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-96">
      <div className="mt-8 mb-4">
        <h1 className="text-slate-300 font-semibold text-2xl pb-4">
          Anime Search App
        </h1>
        <p className="text-slate-400 mb-4">
          Welcome to my personal project - a React application wrapper for the
          anime API provided by{" "}
          <a
            href="https://tenrai.org/"
            target="_blank"
            className="underline underline-offset-4"
            rel="noreferrer"
          >
            Tenrai
          </a>
          , an unofficial{" "}
          <a
            href="https://myanimelist.net/"
            target="_blank"
            className="underline underline-offset-4"
            rel="noreferrer"
          >
            MyAnimeList
          </a>
          {" "}API. As an avid anime fan, I wanted to create a platform that allows
          me to explore and enjoy my favorite shows with ease. This application
          uses Tenrai's{" "}
          <a
            href="https://api.tenrai.org/documentation"
            referrerPolicy="no-referrer"
            target="_blank"
            className="underline underline-offset-4"
            rel="noreferrer"
          >
            v1 API
          </a>
          , providing me with real-time access to a wealth of anime information.
          With a primary focus on search functionality and advanced filters,
          this is an application that allows browsing through a diverse range of
          titles.
        </p>
        <p className="text-slate-300 mb-4">
          ⚠ This project is still under development. ⚠
        </p>
      </div>
      <AnimeForm searchAnime={searchAnime} />
      <AnimeList
        searchResults={searchResults}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      <div className="border-t-[1px] border-slate-600 text-center py-1 mb-2">
        <span className="text-slate-600 text-sm">
          Created by {" "}
          <a
            href="https://www.github.com/AzriellBautista/"
            target="_blank"
            rel="noreferrer"
          >
            Azriell Bautista
          </a>
          . Made with React and Tailwind CSS.
        </span>
      </div>
    </div>
  );
}

export default App;
