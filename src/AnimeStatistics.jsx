import { useState } from "react";
import { getAnimeStatistics as fetchAnimeStatistics } from "./api";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiLoader4Line,
} from "react-icons/ri";

const AnimeStatistics = ({ mal_id = 1 }) => {
  const [animeStatistics, setAnimeStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showThis, setShowThis] = useState(false);

  const getAnimeStatistics = async () => {
    try {
      setIsLoading(true);
      const response = await fetchAnimeStatistics(mal_id);
      setAnimeStatistics(response.data.data);
      setShowThis(true);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setAnimeStatistics(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <button className="font-semibold text-slate-600 cursor-not-allowed mb-1">
            Statistics
            <RiLoader4Line className="animate-spin -mt-1 h-6 w-6 inline-block align-middle text-slate-600" />
          </button>
        </div>
      ) : (
        <div>
          {animeStatistics ? (
            <>
              <h3
                onClick={() => setShowThis(!showThis)}
                className="font-semibold text-slate-200 cursor-pointer"
              >
                Statistics
                {showThis ? (
                  <RiArrowDropUpLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                ) : (
                  <RiArrowDropDownLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                )}
              </h3>
              {showThis && (
                <>
                  <div className="mb-2 px-4">
                    <ul className="list-none text-slate-400">
                      <li>
                        <span className="mr-1 font-semibold">Watching:</span>
                        <span className="text-slate-500">
                          {animeStatistics?.watching}
                        </span>
                      </li>
                      <li>
                        <span className="mr-1 font-semibold">Completed:</span>
                        <span className="text-slate-500">
                          {animeStatistics?.completed}
                        </span>
                      </li>
                      <li>
                        <span className="mr-1 font-semibold">On-Hold:</span>
                        <span className="text-slate-500">
                          {animeStatistics?.on_hold}
                        </span>
                      </li>
                      <li>
                        <span className="mr-1 font-semibold">Dropped:</span>
                        <span className="text-slate-500">
                          {animeStatistics?.dropped}
                        </span>
                      </li>
                      <li>
                        <span className="mr-1 font-semibold">
                          Plan to Watch:
                        </span>
                        <span className="text-slate-500">
                          {animeStatistics?.plan_to_watch}
                        </span>
                      </li>
                      <li className="italic">
                        <span className="mr-1 font-bold">Total:</span>
                        <span className="font-bold">
                          {animeStatistics?.total}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="px-4">
                    {animeStatistics?.scores.length === 0 ? (
                      <p className="text-slate-600 italic text-center select-none">
                        No scores have been recorded for this anime.
                      </p>
                    ) : (
                      <></>
                    )}
                    {animeStatistics?.scores.map((score, index) => {
                      return (
                        <div className="flex-1 items-center" key={index}>
                          <div className="block">
                            <span className="inline-block w-4 text-base text-slate-400 mr-2">
                              {score.score}
                            </span>
                            <span
                              className="inline-block h-4 rounded-md shadow-sm"
                              style={{
                                width: score.percentage + "%",
                                minWidth: "0.5rem",
                                backgroundColor: `hsl(${
                                  67 + 12 * index
                                }, 100%, 50%)`,
                              }}
                            ></span>
                            <span className="inline-block ml-2 text-slate-500 text-sm italic">
                              {score.votes} ({score.percentage}%)
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          ) : (
            <div>
              <button
                className="font-semibold text-slate-600 cursor-pointer"
                onClick={getAnimeStatistics}
              >
                Statistics
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

export default AnimeStatistics;
