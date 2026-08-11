import React from "react";
import Select from "react-select";
import axios from "axios";

import {
  // GenresEnums,
  OrderByEnums,
  RatingEnums,
  SortEnums,
  StatusEnums,
  TypeEnums,
} from "./AnimeApiEnums";

class AnimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      type: "",
      genresInclude: "",
      genresExclude: "",
      status: "",
      rating: "",
      orderBy: "",
      sort: "",

      genres: [],
      genresIntersectionError: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // localStorage.removeItem("genres"); // force update the genres
    this._fetchAnimeGenresFromApiOrLocalStorage();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.genresInclude !== prevState?.genresInclude ||
      this.state.genresExclude !== prevState?.genresExclude
    ) {
      let genresIntersection = this._checkGenresIntersection();
      this.setState({ genresIntersectionError: genresIntersection });
    }
  }

  async _fetchAnimeGenresFromApiOrLocalStorage() {
    const genres = localStorage.getItem("genres");
    let genresOptions;
    if (genres) {
      genresOptions = JSON.parse(genres);
      console.log("Loaded genres from local storage.");
    } else {
      const response = await axios.get("https://api.jikan.moe/v4/genres/anime");
      genresOptions = response.data?.data.map((genre) => {
        return {
          value: genre.mal_id,
          label: genre.name,
        };
      });
      localStorage.setItem("genres", JSON.stringify(genresOptions));
      console.log("Loaded genres from API.");
    }
    this.setState({ genres: genresOptions });
  }

  _checkGenresIntersection() {
    // checks if there is an intersection between the genres to include and the genres to exclude
    // returns the name of genres separated by commas
    let genresIntersection = this.state.genres
      .filter((genre) =>
        this.state.genresInclude
          .split(",")
          .filter((genre) =>
            this.state.genresExclude.split(",").includes(genre)
          )
          .map(Number)
          .includes(genre.value)
      )
      .map((genre) => genre.label)
      .join(", ");

    return genresIntersection;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      query,
      type,
      genresInclude,
      genresExclude,
      status,
      rating,
      orderBy,
      sort,
    } = this.state;

    this.props?.searchAnime(
      query,
      type,
      genresInclude,
      genresExclude,
      status,
      rating,
      orderBy,
      sort
    );
  };

  render() {
    return (
      <div className="bg-slate-900 my-8 shadow-lg rounded-md">
        <div className="">
          <form
            onSubmit={this.handleFormSubmit}
            className="flex flex-col gap-1 p-4"
          >
            {this.state.genresError && <>{this.state.genresError}</>}

            <div className="mb-2">
              <label htmlFor="query" className="relative block">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Query:
                </span>
                <input
                  className="peer transition-color w-full text-slate-300 placeholder:text-slate-700 focus:placeholder:text-slate-800 px-[15px] py-[11px]  bg-slate-950 rounded-lg border-2 border-gray-700 focus:outline-none focus:border-gray-500 hover:border-gray-500"
                  type="text"
                  name="query"
                  id="query"
                  placeholder="Search in anime title..."
                  onChange={(e) => {
                    this.setState({ query: e.target.value });
                  }}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="genresInclude" className="relative block">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Genres to include:
                </span>
                <Select
                  isLoading={this.state.genres.length === 0}
                  options={this.state.genres}
                  name="genresInclude"
                  id="genresInclude"
                  placeholder="Select genres to include..."
                  loadingMessage={() => "Fetching genres..."}
                  isMulti
                  isClearable
                  isSearchable
                  styles={customStyles}
                  classNames={{
                    control: () =>
                      this.state.genresIntersectionError ? "hue-rotate-90" : "",
                  }}
                  onChange={(selectedOptions) => {
                    this.setState({
                      genresInclude: selectedOptions
                        .map((option) => option.value)
                        .join(","),
                    });
                  }}
                  closeMenuOnSelect={false}
                  closeMenuOnScroll={true}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="genresExclude">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Genres to exclude:
                </span>
                <Select
                  isLoading={this.state.genres.length === 0}
                  loadingMessage={() => "Fetching genres..."}
                  options={this.state.genres}
                  name="genresExclude"
                  id="genresExclude"
                  placeholder="Select genres to exclude..."
                  isMulti
                  isClearable
                  isSearchable
                  styles={customStyles}
                  classNames={{
                    control: () =>
                      this.state.genresIntersectionError
                        ? "transition-all duration-500 hue-rotate-90"
                        : "transition-all duration-500 hue-rotate-0",
                  }}
                  onChange={(selectedOptions) => {
                    this.setState({
                      genresExclude: selectedOptions
                        .map((option) => option.value)
                        .join(","),
                    });
                  }}
                  closeMenuOnSelect={false}
                  closeMenuOnScroll={true}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="rating">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Anime rating:
                </span>
                <Select
                  options={RatingEnums}
                  name="rating"
                  id="rating"
                  placeholder="Select anime rating..."
                  styles={customStyles}
                  isClearable
                  onChange={(selectedOption) => {
                    selectedOption && selectedOption?.value !== null
                      ? this.setState({ rating: selectedOption.value })
                      : this.setState({ rating: "" });
                  }}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="type">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Anime type:
                </span>
                <Select
                  options={TypeEnums}
                  name="type"
                  id="type"
                  placeholder="Select anime type..."
                  styles={customStyles}
                  isClearable
                  isSearchable
                  onChange={(selectedOption) => {
                    selectedOption && selectedOption?.value !== null
                      ? this.setState({ type: selectedOption.value })
                      : this.setState({ type: "" });
                  }}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="status">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Anime status:
                </span>
                <Select
                  options={StatusEnums}
                  name="type"
                  id="type"
                  placeholder="Select anime status..."
                  styles={customStyles}
                  isClearable
                  onChange={(selectedOption) => {
                    selectedOption && selectedOption?.value !== null
                      ? this.setState({ status: selectedOption.value })
                      : this.setState({ status: "" });
                  }}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="orderBy">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Order results by:
                </span>
                <Select
                  options={OrderByEnums}
                  name="orderBy"
                  id="orderBy"
                  placeholder="Select anime ordering..."
                  styles={customStyles}
                  isClearable
                  isSearchable
                  onChange={(selectedOption) => {
                    selectedOption && selectedOption?.value !== null
                      ? this.setState({ orderBy: selectedOption.value })
                      : this.setState({ orderBy: "" });
                  }}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="mb-2">
              <label htmlFor="sort">
                <span className="block text-slate-400 ml-2 mb-1 select-none">
                  Sort results by:
                </span>
                <Select
                  options={SortEnums}
                  name="sorting"
                  id="sorting"
                  placeholder="Select anime sorting..."
                  styles={customStyles}
                  isClearable
                  isSearchable
                  onChange={(selectedOption) => {
                    selectedOption && selectedOption?.value !== null
                      ? this.setState({ sort: selectedOption.value })
                      : this.setState({ sort: "" });
                  }}
                  noOptionsMessage={() => "┐(￣ω￣;)┌"}
                />
              </label>
            </div>

            <div className="my-3">
              <input
                type="submit"
                value="Search"
                disabled={this.state.genresIntersectionError}
                className="w-full bg-[#ff0000] text-slate-800 text-lg font-semibold py-2 px-4 rounded-md from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br  cursor-pointer disabled:cursor-not-allowed disabled:hue-rotate-[135deg]"
              />

              {this.state.genresIntersectionError && (
                <span className="my-1 cursor-help text-clip from-[#E0FF00] to-[#00E0FF] bg-gradient-to-br text-transparent bg-clip-text select-none hue-rotate-90 text-sm">
                  Please remove intersection between included and excluded
                  genres:{" "}
                  <strong className="font-semibold">
                    {this.state.genresIntersectionError}
                  </strong>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const customStyles = {
  control: (defaultStyles, state) => ({
    ...defaultStyles,
    backgroundColor: "#020617",
    border: state.isFocused ? "2px solid #64748b" : "2px solid #334155",
    borderRadius: "0.5rem",
    padding: "0.25rem",
    boxShadow: "0rem",
    boxSizing: "content-box",
    ":hover": {
      border: "2px solid #64748b",
    },
  }),
  option: (defaultStyles, state) => ({
    // ...defaultStyles,
    transition: "none !important",
    margin: "0.25rem",
    padding: "0.5rem",
    overflow: "hidden",
    borderRadius: "0.5rem",
    color: "#cbd5e1",
    ":hover": {
      background: "linear-gradient(to bottom right, #e1ff00 0%, #00e1ff 100%)",
      color: "#0f172a",
      fontWeight: "bold",
      cursor: "pointer",
      ":after": {
        content: "' \\002b'",
      },
    },
  }),

  menu: (defaultStyles, state) => ({
    ...defaultStyles,
    overflow: "hidden",
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: "0.5rem",
    border: "2px solid #64748b",
    boxShadow: "0px 0px 5px #0f172a",
    fontSize: "1rem",
    fontFamily: "monospace",
  }),
  menuPortal: (defaultStyles, state) => ({
    ...defaultStyles,
  }),

  // Single-value select
  singleValue: (defaultStyles, state) => ({
    ...defaultStyles,
    color: "#0f172a",
    borderRadius: "999rem",
    background: "linear-gradient(to bottom right, #e1ff00 0%, #00e1ff 100%)",
    margin: "0.25rem",
    padding: "0.35rem 1rem 0.35rem 1rem",
    width: "max-content",
    font: "1rem monospace",
    userSelect: "none",
  }),
  valueContainer: (defaultStyles, state) => ({
    ...defaultStyles,
  }),

  // Multi-value select
  multiValue: (defaultStyles, state) => ({
    ...defaultStyles,
    background: "linear-gradient(to bottom right, #e1ff00 0%, #00e1ff 100%)",
    borderRadius: "999rem",
    margin: "0.25rem",
    paddingLeft: "0.5rem",
  }),
  multiValueLabel: (defaultStyles, state) => ({
    ...defaultStyles,
    color: "#0f172a",
    fontFamily: "monospace",
    fontSize: "1rem",
    userSelect: "none",
  }),
  multiValueRemove: (defaultStyles, state) => ({
    ...defaultStyles,
    color: "#1e293b",
    borderRadius: "0rem 1rem 1rem 0rem",
    ":hover": {
      color: "#cbd5e1",
      backgroundColor: "#1e293b88",
    },
  }),
  // Indicators
  indicatorsContainer: (defaultStyles, state) => ({
    ...defaultStyles,
  }),
  clearIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    cursor: "pointer",
    color: state.isFocused ? "#64748b" : "#334155",
    ":hover": {
      color: "#94a3b8",
    },
  }),
  indicatorSeparator: (defaultStyles, state) => ({
    ...defaultStyles,
    border: "1px solid #334155",
    borderRadius: "2px",
  }),
  dropdownIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    cursor: "pointer",
    color: state.isFocused ? "#64748b" : "#334155",
    ":hover": {
      color: "#94a3b8",
    },
  }),
  loadingIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    color: "#334155",
  }),
  // Texts
  placeholder: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isFocused ? "#1e293b" : "#334155",
    userSelect: "none",
  }),
  input: (defaultStyles, state) => ({
    ...defaultStyles,
    color: "#cbd5e1",
    fontSize: "1rem",
  }),
  noOptionsMessage: (defaultStyles, state) => ({
    ...defaultStyles,
    cursor: "not-allowed",
    color: "#334155",
    fontSize: "1rem",
  }),
};

export default AnimeForm;
