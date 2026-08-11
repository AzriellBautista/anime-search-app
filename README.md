# Anime Search App

A React application wrapper for the anime API provided by [Tenrai](https://tenrai.org/), an unofficial [MyAnimeList](https://myanimelist.net/) API. Search and explore your favorite anime titles with rich detail views.

Built with React, Vite, and Tailwind CSS.

## Features

- **Search** with optional filters:
  - Query (anime title)
  - Genres to include / exclude (with intersection validation)
  - Rating, type, and status
  - Order results by field (MAL ID, title, score, rank, popularity, etc.) and sort direction
- **Pagination** with jump-to-page controls
- **Anime detail card** for each result, including:
  - Information (status, aired, episodes, duration, type, source, rating)
  - Alternative titles (English, Japanese, synonyms)
  - Synopsis and background (with expandable long text)
  - Genres, demographics, and themes
  - MyAnimeList statistics (score, scored by, rank, popularity, members, favorites)
  - Lazy-loaded **Characters**, **Pictures**, **Recommendations**, and **Statistics** sections
  - Direct links to MyAnimeList pages (characters, episodes, videos, stats, reviews, etc.)

## Getting Started

```bash
npm install
```

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode with Vite. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page reloads when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include hashes.

### `npm run deploy`

Builds the app and deploys the `dist` folder to GitHub Pages using `gh-pages`.

## API

All requests go through the shared axios instance in `src/api.js`, pointed at `https://api.tenrai.org/v1`.

| Endpoint | Function |
| --- | --- |
| `GET /anime` | `searchAnime(params)` — search results with pagination |
| `GET /genres/anime` | `getAnimeGenres()` — list of anime genres |
| `GET /anime/{id}/characters` | `getAnimeCharacters(malId)` |
| `GET /anime/{id}/statistics` | `getAnimeStatistics(malId)` |
| `GET /anime/{id}/pictures` | `getAnimePictures(malId)` |
| `GET /anime/{id}/recommendations` | `getAnimeRecommendations(malId)` |

## Project Structure

```
src/
├── api.js                 # Shared axios instance and API helper functions
├── App.jsx                # Root component (state, search handler)
├── Anime.jsx              # Individual anime detail card
├── AnimeList.jsx          # Results list + pagination
├── AnimeForm.jsx          # Search form with filters
├── AnimePictures.jsx      # Lazy-loaded pictures section
├── AnimeCharacters.jsx    # Lazy-loaded characters section
├── AnimeRecommendations.jsx # Lazy-loaded recommendations section
├── AnimeStatistics.jsx    # Lazy-loaded statistics section
├── AnimeApiEnums.js       # Shared select options (ratings, types, ordering, etc.)
└── index.jsx              # Entry point
```

## Deployment

The app is configured for GitHub Pages (`homepage` in `package.json` and `base: "./"` in `vite.config.mjs`). Deploy with:

```bash
npm run deploy
```
