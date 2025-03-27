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
  SimpleGrid,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const betAmounts = [1, 3, 5, 10];

const BetControls = ({ game }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.player);
  const { loading: isBetting, error } = useSelector((state) => state.bets);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [betResult, setBetResult] = useState(null);

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
      const result = await dispatch(placeBet(token, game.id, amount));

      if (result?.bet?.won) {
        setBetResult({
          message: `You won! Winnings: $${result.bet.winnings.toFixed(2)}`,
          color: 'green',
        });
      } else {
        setBetResult({
          message: 'You lost the bet. Better luck next time!',
          color: 'red',
        });
      }
    } catch (error) {
      setErrorMessage('Error placing bet. Please try again.');
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

  const handleAmountChange = (value) => {
    if (value >= game.minBet && value <= game.maxBet) {
      setCustomAmount(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Amount out of bet range.');
    }
  };

  return (
    <Card padding="lg" radius="md" shadow="xs" withBorder>
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

      {betResult && (
        <Alert icon={<IconAlertCircle size={16} />} title={betResult.color === 'green' ? 'Congratulations!' : 'Better Luck Next Time!'} color={betResult.color} mb="md">
          {betResult.message}
        </Alert>
      )}

      <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <div>
          <Group spacing="xs" mb="sm">
            <Title order={4}>Your Balance: ${balance.toFixed(2)}</Title>
          </Group>

          <Title order={4} mb="md">
            Quick Bets
          </Title>
          <Group mb="xl" direction="row" spacing="sm">
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
        </div>

        <div>
          <Title order={4} mb="md">
            Custom Bet
          </Title>
          <form onSubmit={handleCustomBet}>
            <Group align="flex-end">
              <NumberInput
                label="Bet Amount"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(value) => handleAmountChange(value)}
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
            <Text size="sm" c="dimmed" mt="xs">
              Min: ${game.minBet.toFixed(2)} | Max: ${game.maxBet.toFixed(2)}
            </Text>
          </form>
        </div>
      </SimpleGrid>
    </Card>
  );
};

export default BetControls;
