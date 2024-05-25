import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import { Movie } from "./types/movie";

interface MovieCardProps {
  movie: Movie;
  onAddMovieToProfile?: (movieId: number, movieTitle: string) => Promise<void>;
  onToggleWatched?: (movieId: number, watched: boolean) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddMovieToProfile,
  onToggleWatched,
}) => {
  const handleAddMovieToProfile = async () => {
    if (onAddMovieToProfile) {
      try {
        await onAddMovieToProfile(movie.id, movie.title);
      } catch (error) {
        console.error("Erro ao adicionar filme ao perfil:", error);
      }
    }
  };

  const handleToggleWatched = () => {
    console.log("Botão para marcar como assistido clicado");
    if (onToggleWatched) {
      const watched = !movie.watched;
      onToggleWatched(movie.id, watched);
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
      {onAddMovieToProfile && (
        <IconButton
          onClick={handleAddMovieToProfile}
          style={{
            position: "absolute",
            color: "white",
            backgroundColor: "green",
            width: 30,
            height: 30,
            cursor: "pointer",
            top: 10,
            right: 10,
          }}
        >
          <AddIcon />
        </IconButton>
      )}
      {onToggleWatched && (
        <IconButton
          onClick={handleToggleWatched}
          style={{
            position: "absolute",
            color: movie.watched ? "green" : "red",
            backgroundColor: "white",
            width: 30,
            height: 30,
            cursor: "pointer",
          }}
        >
          {movie.watched ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      )}

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
