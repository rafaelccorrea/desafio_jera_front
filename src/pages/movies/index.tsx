import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../../components/header";
import axios from "axios";

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
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const StyledImage = styled("img")({
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    margin: "auto",
  });

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
        console.error("Error fetching movies:", error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
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
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        {loading && (
          <Typography variant="h5" style={{ color: "white" }}>
            Carregando...
          </Typography>
        )}
        {error && (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <StyledImage src="../../error.png" alt="Erro" />
          </Grid>
        )}
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <MovieCard>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
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
        <Button onClick={handlePrevPage} disabled={page === 1}>Página Anterior</Button>
        <Typography variant="h6" style={{ margin: "0 10px" }}>
          Página {page} de {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={page === totalPages}>Próxima Página</Button>
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
