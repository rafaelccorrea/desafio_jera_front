import axios from "axios";
import { Movie } from "../components/movie/types/movie";
import api from "./api";

const MovieService = {
  getMovies: async (
    page: number
  ): Promise<{ results: Movie[]; total_pages: number }> => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=a7d14a7c7f5ee9c82fa97bd7a5b8543a&language=pt-BR&sort_by=popularity.desc&page=${page}`
    );
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
