import axios from "axios";

const KEY = "7f46ed0b7b80714f08c9faf9ef178fba";
const BASE_URL = `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`;

export const fetchNews = async () => await axios.get(BASE_URL);

export const fetchNewsPerId = async movieId => {
  return await axios
    .get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}&language=en-US`
    )
    .then(response => response.data);
};

export const fetchCastForFilm = async movieId => {
  return await axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}`)
    .then(response => response.data);
};

export const fetchReviewPage = async movieId => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
};

export const fetchDataForInput = async query => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
};
