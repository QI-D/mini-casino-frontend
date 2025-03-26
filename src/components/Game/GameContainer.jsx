import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGameById } from '../../redux/thunks';
import BetControls from '../Bet/BetControls';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Image,
  Group,
  Badge,
  LoadingOverlay,
  Alert,
  Box
} from '@mantine/core';
import { IconMoodDollar, IconMoodEmpty } from '@tabler/icons-react';
import { formatGameNameToImage } from '../../utils/formatGameName';

const GameContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, loading, error } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingOverlay visible />;
  if (error) return <Alert color="red">{error}</Alert>;
  if (!currentGame) return <Alert color="yellow">Game not found</Alert>;

  const gameImage = require(`../../assets/images/${formatGameNameToImage(currentGame.name)}.jpg`);

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">
        {currentGame.name}
      </Title>

      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 400,
            }}
          >
            <Image
              src={gameImage || '/images/default-game.jpg'}
              alt={currentGame.name}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
              }}
            />
          </Card.Section>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group position="apart" mb="md">
            <Title order={4}>Game Stats</Title>
            <Badge color="green" variant="light">
              {(currentGame.chanceOfWinning * 100).toFixed(0)}% Win Chance
            </Badge>
          </Group>

          <Group spacing="xs" mb="sm">
            <IconMoodDollar size={18} />
            <Text>Payout: {currentGame.winningMultiplier}x</Text>
          </Group>

          <Group spacing="xs" mb="sm">
            <IconMoodEmpty size={18} />
            <Text>
              Bet Range: ${currentGame.minBet.toFixed(2)} - ${currentGame.maxBet.toFixed(2)}
            </Text>
          </Group>
        </Card>
      </SimpleGrid>

      <Box mt="xl">
        <BetControls game={currentGame} />
      </Box>
    </Container>
  );
};

export default GameContainer;
