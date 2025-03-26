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
} from '@mantine/core';
import { IconCoin, IconMoodDollar, IconMoodEmpty } from '@tabler/icons-react';
import { formatGameNameToImage } from '../../utils/formatGameName';

const GameContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentGame, loading, error } = useSelector((state) => state.games);
  const { balance } = useSelector((state) => state.player);

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

      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src={gameImage || '/images/default-game.jpg'}
              height={400}
              alt={currentGame.name}
              withPlaceholder
            />
          </Card.Section>
        </Card>

        <div>
          <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
            <Group position="apart" mb="md">
              <Text weight={500}>Game Stats</Text>
              <Badge color="green" variant="light">
                {(currentGame.chanceOfWinning * 100).toFixed(0)}% Win Chance
              </Badge>
            </Group>

            <Group spacing="xs" mb="sm">
              <IconCoin size={18} />
              <Text>Your Balance: ${balance.toFixed(2)}</Text>
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

          <BetControls game={currentGame} />
        </div>
      </SimpleGrid>
    </Container>
  );
};

export default GameContainer;
