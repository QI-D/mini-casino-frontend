import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllGames } from '../redux/thunks';
import GameCard from '../components/Game/GameCard';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Space,
  Button,
  Center,
  Loader,
  rem,
  Box,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredGames, loading } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={(theme) => ({
          position: 'relative',
          backgroundImage:
            'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/images/casino-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: `${rem(100)} ${rem(20)}`,
          color: theme.white,
          textAlign: 'center',
        })}
      >
        <Container size="xl" style={{ textAlign: 'center' }}>
          <Title order={1} mb="md">
            Welcome to Mini Casino
          </Title>
          <Text size="lg" mb="xl">
            Play your favorite games and win big!
          </Text>
        </Container>
      </Box>

      <Container size="xl" py={rem(50)}>
        <Title order={2} mb="xl" align="center">
          Featured Games
        </Title>

        {loading ? (
          <Center>
            <Loader size="xl" />
          </Center>
        ) : (
          <SimpleGrid
            cols={4}
            spacing="lg"
            breakpoints={[
              { maxWidth: 'md', cols: 3, spacing: 'md' },
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        )}

        <Space h={50} />
        <Center>
          <Button
            component={Link}
            to="/games"
            size="lg"
          >
            View All Games
          </Button>
        </Center>
      </Container>
    </>
  );
};

export default HomePage;
