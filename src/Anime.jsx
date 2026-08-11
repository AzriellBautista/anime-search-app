import AnimePictures from "./AnimePictures";
import AnimeRecommendations from "./AnimeRecommendations";
import AnimeCharacters from "./AnimeCharacters";
import AnimeStatistics from "./AnimeStatistics";

const Anime = ({ anime }) => {
  return (
    <>
      <div className="h-max from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br mb-2 py-2 my-8 rounded-md shadow-md hover:shadow-2xl selection:bg-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 bg-slate-900 h-full">
          {/* Left column  */}
          <div className="md:col-span-2 p-0 bg-slate-950">
            <img
              src={anime.images?.webp?.large_image_url}
              alt={anime.title}
              className="mx-auto aspect-auto w-full"
              loading="lazy"
            />

            {/* MyAnimeList URLs */}
            <div className="text-center my-2 opacity-75">
              {MyAnimeList_Urls.map((url, index) => (
                <a
                  href={anime.url + url.suffix}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold mx-2 from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br text-transparent bg-clip-text"
                >
                  [{url.text}]
                </a>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-1 md:col-span-3 p-4 bg-slate-900">
            <h1 className="text-3xl font-bold text-center mb-4">
              <a
                href={anime.url}
                target="_blank"
                rel="noreferrer"
                className=" from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br bg-clip-text text-transparent"
              >
                {anime.title}
              </a>{" "}
              <span
                className="select-none text-slate-800 hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(anime));
                  alert("Copied anime details in JSON to clipboard!");
                }}
              >
                #{anime.mal_id}
              </span>
            </h1>

            <div className="from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br hue-rotate-60 h-1 rounded text-transparent my-4 mx-8 opacity-20" />

            {/* Information and alternative titles */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {/* Left column */}
              <div className="">
                {/* Information */}
                <h2 className="font-semibold text-sm text-slate-300">
                  Information
                </h2>
                <div className="mb-2">
                  <ul className="list-disc ml-4 text-slate-400 text-xs">
                    {anime.status && (
                      <li>
                        <span className="mr-1 font-semibold">Status:</span>
                        <span className="text-slate-500">{anime.status}</span>
                      </li>
                    )}
                    {anime.aired.string && (
                      <li>
                        <span className="mr-1 font-semibold">Aired:</span>
                        <span className="text-slate-500">
                          {anime.aired.string}
                        </span>
                      </li>
                    )}
                    {anime.episodes && (
                      <li>
                        <span className="mr-1 font-semibold">Episodes:</span>
                        <span className="text-slate-500">{anime.episodes}</span>
                      </li>
                    )}
                    {anime.duration && (
                      <li>
                        <span className="mr-1 font-semibold">Duration:</span>
                        <span className="text-slate-500">{anime.duration}</span>
                      </li>
                    )}
                    {anime.type && (
                      <li>
                        <span className="mr-1 font-semibold">Type:</span>
                        <span className="text-slate-500">{anime.type}</span>
                      </li>
                    )}
                    {anime.source && (
                      <li>
                        <span className="mr-1 font-semibold">Source:</span>
                        <span className="text-slate-500">{anime.source}</span>
                      </li>
                    )}
                    {anime.rating && (
                      <li>
                        <span className="mr-1 font-semibold">Rating:</span>
                        <span className="text-slate-500">{anime.rating}</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Right column  */}
              <div className="">
                {/* Alternative titles */}
                <h2 className="font-semibold text-sm text-slate-300">
                  Alternative Titles
                </h2>
                <div className="mb-2">
                  <ul className="list-disc ml-4 text-slate-400 text-xs">
                    {anime.title_english ? (
                      <li>
                        <span className="mr-1 font-semibold">English:</span>
                        <span className="text-slate-500">
                          {anime.title_english}
                        </span>
                      </li>
                    ) : (
                      <></>
                    )}
                    {anime.title_japanese ? (
                      <li>
                        <span className="mr-1 font-semibold">Japanese:</span>
                        <span className="text-slate-500">
                          {anime.title_japanese}
                        </span>
                      </li>
                    ) : (
                      <></>
                    )}
                    {anime.title_synonyms?.length > 0 ? (
                      <li>
                        <span className="mr-1 font-semibold">Synonyms:</span>
                        <span className="text-slate-500">
                          {anime.title_synonyms.join(", ")}
                        </span>
                      </li>
                    ) : (
                      <></>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="mb-2">
                <p className="text-md text-left text-slate-200">
                  <span className="font-semibold text-slate-200 mr-2">
                    Synopsis:
                  </span>
                  {anime.synopsis.length > 200 ? (
                    <span className="text-slate-400">
                      {anime.synopsis.substring(0, 200).trim()}...
                      <button
                        className="font-semibold ml-1 cursor-pointer text-clip from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br text-transparent bg-clip-text"
                        onClick={(e) => {
                          e.target.parentNode.textContent = anime.synopsis;
                        }}
                      >
                        [Expand]
                      </button>
                    </span>
                  ) : (
                    <span className="text-slate-400">{anime.synopsis}</span>
                  )}
                </p>
              </div>
            )}

            {/* Background */}
            {anime.background && (
              <div className="mb-2">
                <p className="text-md text-left text-slate-200">
                  <span className="font-semibold mr-2">Background:</span>
                  {anime.background.length > 200 ? (
                    <span className="text-slate-400">
                      {anime.background.substring(0, 200).trim()}...
                      <button
                        className="font-semibold ml-1 cursor-pointer text-clip from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br text-transparent bg-clip-text"
                        onClick={(e) => {
                          e.target.parentNode.textContent = anime.background;
                        }}
                      >
                        [Expand]
                      </button>
                    </span>
                  ) : (
                    <span className="text-slate-400">{anime.background}</span>
                  )}
                </p>
              </div>
            )}

            {/* Genres */}
            {anime.genres?.length > 0 && (
              <div className="overflow-auto text-slate-200">
                <span className="font-semibold text-sm">Genres:</span>
                {anime.genres.map((genre, index) => (
                  <span className={"tw_genrePill"} key={index}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Demographics */}
            {anime.demographics?.length > 0 && (
              <div className="overflow-auto text-slate-200">
                <span className="font-semibold text-sm">Demographics:</span>
                {anime.demographics.map((demographic, index) => (
                  <span className={"tw_genrePill"} key={index}>
                    {demographic.name}
                  </span>
                ))}
              </div>
            )}

            {/* Themes */}
            {anime.themes?.length > 0 && (
              <div className="overflow-auto text-slate-200 mb-2">
                <span className="font-semibold text-sm">Themes:</span>
                {anime.themes.map((theme) => (
                  <span className={"tw_genrePill"}>{theme.name}</span>
                ))}
              </div>
            )}

            <div className="from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br hue-rotate-60 h-1 rounded text-transparent my-4 mx-8 opacity-20" />

            {/* MyAnimeList Statistics */}
            <h2 className="text-center font-bold text-md text-slate-200 mb-2">
              MyAnimeList Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2 justify-items-center">
              {/* Score */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Score<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.score ? anime.score : "N/A"}
                </span>
              </div>

              {/* Scored by */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Scored by<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.scored_by ? anime.scored_by : "N/A"}
                </span>
              </div>

              {/* Rank */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Rank<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.rank ? <>#{anime.rank}</> : "N/A"}
                </span>
              </div>

              {/* Popularity  */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Popularity<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.popularity ? <>#{anime.popularity}</> : "N/A"}
                </span>
              </div>

              {/* Members  */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Members<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.members >= 0 ? anime.members : "N/A"}
                </span>
              </div>

              {/* Favorites */}
              <div className="flex md:flex-col-reverse gap-y-0 gap-x-1 flex-row items-center">
                <span className="text-sm text-slate-500">
                  Favorites<span className="md:opacity-0 opacity-100">:</span>
                </span>
                <span className="text-sm md:text-2xl font-semibold text-slate-200">
                  {anime?.favorites >= 0 ? anime.favorites : "N/A"}
                </span>
              </div>
            </div>

            <div className="from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br hue-rotate-60 h-1 rounded text-transparent my-4 mx-8 opacity-20" />

            <AnimePictures mal_id={anime.mal_id} />

            <AnimeCharacters mal_id={anime.mal_id} anime_url={anime.url} />

            <AnimeRecommendations mal_id={anime.mal_id} anime_url={anime.url} />

            <AnimeStatistics mal_id={anime.mal_id} />
          </div>
        </div>
      </div>
    </>
  );
};

const MyAnimeList_Urls = [
  { suffix: "/characters", text: "Characters" },
  { suffix: "/episode", text: "Episodes" },
  { suffix: "/video", text: "Videos" },
  { suffix: "/stats", text: "Stats" },
  { suffix: "/reviews", text: "Reviews" },
  { suffix: "/userrecs", text: "Recommendations" },
  { suffix: "/stacks", text: "Stacks" },
  { suffix: "/news", text: "News" },
  { suffix: "/forum", text: "Forum" },
  { suffix: "/clubs", text: "Clubs" },
  { suffix: "/pics", text: "Pictures" },
  { suffix: "/moreinfo", text: "Extras" },
];

export default Anime;
