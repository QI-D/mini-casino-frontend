import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeBet } from '../../redux/thunks';
import {
  Group,
  Button,
  NumberInput,
  Text,
  Card,
  Title,
  Alert,
  LoadingOverlay,
} from '@mantine/core';
import { IconCoin, IconAlertCircle } from '@tabler/icons-react';

const betAmounts = [1, 3, 5, 10];

const BetControls = ({ game }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.player);
  const { loading: isBetting, error } = useSelector((state) => state.bets);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleBet = async (amount) => {
    if (!token) {
      setErrorMessage('Please login to place bets');
      return;
    }

    if (amount > balance) {
      setErrorMessage('Insufficient balance');
      return;
    }

    if (amount < game.minBet) {
      setErrorMessage(`Minimum bet is $${game.minBet}`);
      return;
    }

    if (amount > game.maxBet) {
      setErrorMessage(`Maximum bet is $${game.maxBet}`);
      return;
    }

    try {
      setErrorMessage('');
      await dispatch(placeBet(token, game.id, amount));
    } catch (error) {
      console.error('Bet failed:', error);
    }
  };

  const handleCustomBet = (e) => {
    e.preventDefault();
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage('Please enter a valid bet amount');
      return;
    }
    handleBet(amount);
    setCustomAmount('');
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <LoadingOverlay visible={isBetting} />
      
      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}

      {errorMessage && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {errorMessage}
        </Alert>
      )}

      <Title order={4} mb="md">
        Quick Bets
      </Title>
      <Group mb="xl">
        {betAmounts.map((amount) => (
          <Button
            key={amount}
            onClick={() => {
              setSelectedAmount(amount);
              handleBet(amount);
            }}
            disabled={isBetting || amount > balance}
            variant={selectedAmount === amount ? 'filled' : 'outline'}
          >
            ${amount}
          </Button>
        ))}
      </Group>

      <Title order={4} mb="md">
        Custom Bet
      </Title>
      <form onSubmit={handleCustomBet}>
        <Group align="flex-end">
          <NumberInput
            label="Bet Amount"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(value) => setCustomAmount(value)}
            min={game.minBet}
            max={game.maxBet}
            precision={2}
            step={0.1}
            style={{ flex: 1 }}
          />
          <Button type="submit" disabled={isBetting}>
            Place Bet
          </Button>
        </Group>
        <Text size="sm" color="dimmed" mt="xs">
          Min: ${game.minBet.toFixed(2)} | Max: ${game.maxBet.toFixed(2)}
        </Text>
      </form>
    </Card>
  );
};

export default BetControls;
