import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import { IconCoin } from '@tabler/icons-react';
import { formatGameNameToImage } from '../../utils/formatGameName';


const GameCard = ({ game }) => {
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const gameImage = require(`../../assets/images/${formatGameNameToImage(game.name)}.jpg`);

  const handleClick = () => {
    navigate(`/games/${game.id}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={handleClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
      sx={{
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <Card.Section>
        <Image
          src={gameImage || '/images/default-game.jpg'}
          height={160}
          alt={game.name}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{game.name}</Text>
        <Badge color="green" variant="light">
          {(game.chanceOfWinning * 100).toFixed(0)}% Win
        </Badge>
      </Group>

      <Group spacing="xs" mb="xs">
        <IconCoin size={16} color={theme.colors.yellow[6]} />
        <Text size="sm" color="dimmed">
          Payout: {game.winningMultiplier}x
        </Text>
      </Group>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Play Now
      </Button>
    </Card>
  );
};

export default GameCard;
