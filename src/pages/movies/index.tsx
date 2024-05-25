import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  TextField,
} from "@mui/material";
import Header from "../../components/header";
import MovieCard from "../../components/movie/movie-card";
import { Movie } from "../../components/movie/types/movie";
import MovieService from "../../service/movie-service";
import Pagination from "../../components/pagination";
import api from "../../service/api";

const MovieList: React.FC = () => {
  const { id, name } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [addingMovie, setAddingMovie] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { results, total_pages } = await MovieService.getMovies(
          page,
          searchTerm
        );
        setMovies(results);
        setTotalPages(total_pages);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setErrorMessage(
          "Erro ao buscar filmes. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, searchTerm]);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error) {
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

  const handleSearch = () => {
    setPage(1); // Reset page when initiating a new search
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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

      <TextField
        label="Pesquisar filme"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
        sx={{
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          width: "100%",
          "& .MuiInputLabel-root": {
            color: "green",
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            "& fieldset": {
              borderColor: "green",
            },
            "&:hover fieldset": {
              borderColor: "green",
            },
            "&.Mui-focused fieldset": {
              borderColor: "green",
            },
          },
        }}
        InputProps={{
          style: {
            color: "green",
            paddingLeft: 10,
          },
        }}
        InputLabelProps={{
          style: {
            color: "green",
            fontSize: 20,
          },
        }}
      />

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
            <MovieCard
              movie={movie}
              onAddMovieToProfile={handleAddMovieToProfile}
            />
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

export default MovieList;
