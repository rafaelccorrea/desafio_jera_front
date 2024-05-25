import axios from "axios";
import { Movie } from "../components/movie/types/movie";
import api from "./api";

const API_KEY = "a7d14a7c7f5ee9c82fa97bd7a5b8543a";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieService = {
  getMovies: async (
    page: number,
    term: string
  ): Promise<{ results: Movie[]; total_pages: number }> => {
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`;
    if (term) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(
        term
      )}&page=${page}`;
    }
    const response = await axios.get(url);
    return response.data;
  },
  addMovieToProfile: async (id: number, title: string) => {
    const response = await api.post(`/perfils/${id}/movies`, {
      external_id: id,
      title,
      category: "Teste",
    });
    console.log(response);
  },
};

export default MovieService;
