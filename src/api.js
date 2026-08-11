import axios from "axios";

const API_BASE_URL = "https://api.tenrai.org/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const searchAnime = (params) => api.get("/anime", { params });

export const getAnimeGenres = () => api.get("/genres/anime");

export const getAnimeCharacters = (malId) =>
  api.get(`/anime/${malId}/characters`);

export const getAnimeStatistics = (malId) =>
  api.get(`/anime/${malId}/statistics`);

export const getAnimePictures = (malId) =>
  api.get(`/anime/${malId}/pictures`);

export const getAnimeRecommendations = (malId) =>
  api.get(`/anime/${malId}/recommendations`);

export default api;
