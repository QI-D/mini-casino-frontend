import React from 'react';
import { Container, Title } from '@mantine/core';
import GameLibrary from '../components/Game/GameLibrary';

const GamesPage = () => {
  return (
    <Container size="xl">
      <Title order={1} mb="xl">
        Our Game Collection
      </Title>
      <GameLibrary />
    </Container>
  );
};

export default GamesPage;
