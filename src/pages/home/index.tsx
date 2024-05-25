import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toolbar, Typography, Avatar, Grid } from "@mui/material";
import { getItem } from "../../utils/local-storage";
import { Profile } from "../../service/types";
import { ContainerWrapper, ContentContainer, ProfileCard } from "./styles";
import Header from "../../components/header";

const Home: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const userAuth = getItem("userAuth");
    if (userAuth) {
      try {
        const parsedUserAuth = JSON.parse(userAuth);
        if (parsedUserAuth.profiles && Array.isArray(parsedUserAuth.profiles)) {
          setProfiles(parsedUserAuth.profiles);
        }
      } catch (e) {
        console.error("Failed to parse userAuth from localStorage", e);
      }
    }
  }, []);

  const getRandomAvatarUrl = (id: number) =>
    `https://i.pravatar.cc/150?img=${id}`;

  return (
    <ContainerWrapper>
      <Header logoSrc="../../nextlogo.png" />
      <Toolbar />
      <ContentContainer maxWidth="md">
        <Grid container justifyContent="center" spacing={6}>
          {profiles.map((profile) => (
            <Grid item key={profile.id}>
              <Link to={`/filmes/${profile.id}/${profile.name}`}>
                <ProfileCard>
                  <Avatar
                    alt={profile.name}
                    src={getRandomAvatarUrl(profile.id)}
                    sx={{ width: 150, height: 150 }}
                  />
                  <Typography variant="h6" color="white" align="center">
                    {profile.name}
                  </Typography>
                </ProfileCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </ContainerWrapper>
  );
};

export default Home;
