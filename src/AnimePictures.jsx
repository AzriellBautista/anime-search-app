import { useState } from "react";
import axios from "axios";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiLoader4Line,
} from "react-icons/ri";

const AnimePictures = ({ mal_id = 1 }) => {
  const [animePictures, setAnimePictures] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showThis, setShowThis] = useState(false);

  const getAnimePictures = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${mal_id}/pictures`
      );
      setAnimePictures(response.data.data);
      setShowThis(true);
      setError(false);
      setErrorMessage("");
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      setAnimePictures(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <button className="font-semibold text-slate-600 cursor-not-allowed mb-1">
            Pictures
            <RiLoader4Line className="animate-spin -mt-1 h-6 w-6 inline-block align-middle text-slate-600" />
          </button>
        </div>
      ) : (
        <div>
          {animePictures ? (
            <>
              <h3
                onClick={() => setShowThis(!showThis)}
                className="font-semibold text-slate-200 cursor-pointer"
              >
                Pictures ({animePictures.length})
                {showThis ? (
                  <RiArrowDropUpLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                ) : (
                  <RiArrowDropDownLine className="-ml-1 -mt-1 h-8 w-8 inline-block align-middle" />
                )}
              </h3>
              {showThis && (
                <>
                  <div className="flex flex-col m-auto p-auto mb-4">
                    <div className="flex overflow-x-scroll snap-x">
                      <div className="flex flex-nowrap lg:mx-40 md:mx-20 mx-10 items-center">
                        {animePictures.map((picture) => {
                          return (
                            <div className="inline-block mx-4 snap-center">
                              <img
                                src={picture.jpg.image_url}
                                className="h-auto max-w-sm overflow-hidden rounded-md shadow-md"
                                alt={picture.jpg.image_url}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div>
              <button
                className="font-semibold text-slate-600 cursor-pointer"
                onClick={getAnimePictures}
              >
                Pictures
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

export default AnimePictures;
