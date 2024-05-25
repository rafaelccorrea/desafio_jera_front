import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Grid,
  Box,
  Container,
} from "@mui/material";
import Header from "../../components/header";
import styled from "styled-components";
import MovieService from "../../service/movie-service";
import api from "../../service/api";
import { Movie } from "../../components/movie/types/movie";
import MovieCard from "../../components/movie/movie-card";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MyMoviesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get(`/movies/me/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const moviesData = response.data.map(async (item: any) => {
          const externalId = item.movie.external_id;
          const detailedMovie = await MovieService.getMoviesByIds([externalId]);
          return {
            ...detailedMovie[0],
            watched: item.watched,
          };
        });
        const resolvedMoviesData = await Promise.all(moviesData);
        setMovies(resolvedMoviesData);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [id]);

  const handleToggleWatched = async (movieId: number, watched: boolean) => {
    try {
      await api.put(`/movies/${id}/${movieId}/watch`, { watched });

      setMovies(
        (prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId ? { ...movie, watched: watched } : movie
          ) as Movie[]
      );
    } catch (error) {
      console.error("Erro ao marcar filme como assistido:", error);
    }
  };

  return (
    <Container sx={{ mt: 20 }}>
      <Box sx={{ mb: 15 }}>
        <Header logoSrc="../../nextlogo.png" />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src={"../../error.png"}
            alt="Erro ao carregar filmes"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Typography color="error">{error}</Typography>
        </div>
      ) : movies.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <img
            src={"../../error.png"}
            alt="Nenhum filme encontrado"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Typography variant="h6" color="textSecondary">
            Nenhum filme encontrado
          </Typography>
        </div>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Meus Filmes
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <MovieCard
                  movie={movie}
                  onToggleWatched={handleToggleWatched}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MyMoviesPage;
