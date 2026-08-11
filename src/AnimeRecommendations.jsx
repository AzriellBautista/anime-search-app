import { useState } from "react";
import axios from "axios";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiLoader4Line,
  RiExternalLinkLine,
} from "react-icons/ri";

const MAX_RECOMMENDATIONS = 20;

const AnimeRecommendations = ({ mal_id = 0, anime_url = "" }) => {
  const [animeRecommendations, setAnimeRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showThis, setShowThis] = useState(false);

  const getAnimeRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${mal_id}/recommendations`
      );
      setAnimeRecommendations(response.data.data);
      setShowThis(true);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setAnimeRecommendations(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <button className="font-semibold text-slate-600 cursor-not-allowed mb-1">
            Recommendations
            <RiLoader4Line className="animate-spin -mt-1 h-6 w-6 inline-block align-middle text-slate-600" />
          </button>
        </div>
      ) : (
        <div>
          {animeRecommendations ? (
            <>
              <h3
                onClick={() => setShowThis(!showThis)}
                className="font-semibold text-slate-200 cursor-pointer"
              >
                Recommendations (
                {animeRecommendations.length <= MAX_RECOMMENDATIONS
                  ? animeRecommendations.length
                  : `${MAX_RECOMMENDATIONS}+`}
                )
                {showThis ? (
                  <RiArrowDropUpLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                ) : (
                  <RiArrowDropDownLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                )}
              </h3>
              {showThis && (
                <>
                  {animeRecommendations.length < 1 && (
                    <p className="text-slate-600 italic text-center select-none">
                      No recommendations have been added to this title.
                    </p>
                  )}

                  {animeRecommendations.length > 0 && (
                    <div className="flex flex-col m-auto p-auto mb-4">
                      <div className="flex overflow-x-scroll snap-x">
                        <div className="flex flex-nowrap lg:mx-40 md:mx-20 mx-10 items-center">
                          {animeRecommendations
                            .slice(0, MAX_RECOMMENDATIONS)
                            .map((recommendation) => {
                              return (
                                <div className="relative mx-4 snap-center">
                                  <img
                                    src={
                                      recommendation.entry.images.jpg.image_url
                                    }
                                    className="block h-auto max-w-xs overflow-hidden rounded-md shadow-md"
                                    loading="lazy"
                                    alt={recommendation.entry.title}
                                  />
                                  <div className="absolute top-0 left-0 h-full w-full from-transparent to-black to-95% bg-gradient-to-b rounded-md flex flex-col justify-end p-4">
                                    <a
                                      href={recommendation.entry.url}
                                      className="text-slate-300"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {recommendation.entry.title}
                                    </a>
                                  </div>
                                </div>
                              );
                            })}

                          {animeRecommendations.length >
                            MAX_RECOMMENDATIONS && (
                            <div className="mx-4 snap-center">
                              <div className="block h-full w-64 bg-slate-950 rounded-md shadow-md p-4">
                                <p className="text-slate-700 text-center">
                                  <a
                                    href={anime_url + "/userrecs"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    More on MyAnimeList.net
                                    <RiExternalLinkLine className="ml-1 -mt-[3px] h-5 w-5 inline-block align-middle" />
                                  </a>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div>
              <button
                className="font-semibold text-slate-600 cursor-pointer"
                onClick={getAnimeRecommendations}
              >
                Recommendations
                <RiArrowDropDownLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle text-slate-600" />
              </button>
              {error && (
                <p className="italic text-slate-700 text-center select-none mb-2">
                  {errorMessage}. Try again.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimeRecommendations;
