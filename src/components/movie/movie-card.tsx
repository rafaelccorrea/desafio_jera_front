import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { Movie } from "./types/movie";

interface MovieCardProps {
  movie: Movie;
  onAddMovieToProfile: (movieId: number, movieTitle: string) => Promise<void>;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddMovieToProfile,
}) => {
  const handleAddMovieToProfile = async () => {
    try {
      await onAddMovieToProfile(movie.id, movie.title);
    } catch (error) {
      console.error("Erro ao adicionar filme ao perfil:", error);
    }
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <IconButton
        onClick={handleAddMovieToProfile}
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

      <CardContent sx={{ backgroundColor: "black" }}>
        <Typography variant="h5" component="h2" style={{ color: "white" }}>
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
    </StyledCard>
  );
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default MovieCard;
