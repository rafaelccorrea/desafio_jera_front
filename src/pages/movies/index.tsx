import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../../components/header";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import Pagination from "../../components/pagination";
import api from "../../service/api";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
};

const MovieList = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [addingMovie, setAddingMovie] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a7d14a7c7f5ee9c82fa97bd7a5b8543a&language=pt-BR&sort_by=popularity.desc&page=${page}`
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setError(true);
        setErrorMessage(
          "Erro ao buscar filmes. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  useEffect(() => {
    let errorTimeout: NodeJS.Timeout;

    if (error) {
      errorTimeout = setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
    }

    return () => clearTimeout(errorTimeout);
  }, [error]);

  useEffect(() => {
    let successTimeout: NodeJS.Timeout;

    if (successMessage) {
      successTimeout = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }

    return () => clearTimeout(successTimeout);
  }, [successMessage]);

  const handleAddMovieToProfile = async (
    movieId: number,
    movieTitle: string
  ) => {
    setAddingMovie(true);
    try {
      const response = await api.post(`/perfils/${id}/movies`, {
        external_id: movieId,
        title: movieTitle,
        category: "Teste",
      });
      console.log(response);
      setSuccessMessage(`O filme "${movieTitle}" foi adicionado ao perfil.`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Erro ao adicionar filme ao perfil:",
          error.response?.data.error
        );
        setError(true);
        setErrorMessage(error.response?.data.error ?? "Erro desconhecido");
        setAddingMovie(false);
      }
    } finally {
      setAddingMovie(false);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <Container sx={{ mt: 20 }}>
      <Header logoSrc="../../nextlogo.png" />
      <Typography
        variant="h3"
        gutterBottom
        style={{ color: "white", textAlign: "center", marginBottom: 50 }}
      >
        Lista de filmes para {name}
      </Typography>

      {loading || addingMovie ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <CircularProgress style={{ color: "white" }} />
        </div>
      ) : null}

      {error && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Typography variant="body1" color="white" align="center">
            {errorMessage}
          </Typography>
        </div>
      )}

      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            backgroundColor: "rgba(0, 255, 0, 0.8)",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <Typography variant="body1" color="success" align="center">
            {successMessage}
          </Typography>
        </div>
      )}

      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <IconButton
                onClick={() => handleAddMovieToProfile(movie.id, movie.title)}
                style={{
                  position: "absolute",
                  color: "white",
                  backgroundColor: "green",
                  width: 30,
                  height: 30,
                  cursor: "pointer",
                }}
              >
                <AddIcon />
              </IconButton>

              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ color: "white" }}
                >
                  {movie.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  style={{ color: "white" }}
                >
                  {movie.overview.length > 255
                    ? movie.overview.substring(0, 255) + "..."
                    : movie.overview}
                </Typography>
              </CardContent>
            </MovieCard>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" mt={3}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </Grid>
    </Container>
  );
};

const MovieCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default MovieList;
