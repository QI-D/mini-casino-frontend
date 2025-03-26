import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary } from '../../redux/thunks';
import { Card, Text, Loader, Alert, Container, Group } from '@mantine/core';

const BetSummary = () => {
  const dispatch = useDispatch();
  const { betSummary, loading, error } = useSelector((state) => state.bets);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (token) {
      dispatch(fetchSummary(token));
    }
  }, [dispatch, token]);

  if (loading) {
    return (
      <Container>
        <Loader color="blue" size="lg" variant="bars" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert title="Error" color="red" radius="md">
          {error || 'Failed to load bet summary'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="sm" mt="md">
      {betSummary ? (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group position="apart" mb="sm">
            <Text weight={500}>Total Bets:</Text>
            <Text>{betSummary.totalBets}</Text>
          </Group>
          <Group position="apart" mb="sm">
            <Text weight={500}>Total Bet Amount:</Text>
            <Text>${betSummary.totalBetAmount}</Text>
          </Group>
          <Group position="apart" mb="sm">
            <Text weight={500}>Total Winnings:</Text>
            <Text>${betSummary.totalWinnings}</Text>
          </Group>
          <Group position="apart">
            <Text weight={500}>Net Profit:</Text>
            <Text c={betSummary.netProfit >= 0 ? 'green' : 'red'}>
              ${betSummary.netProfit}
            </Text>
          </Group>
        </Card>
      ) : (
        <Alert title="No Data" color="yellow" radius="md">
          No bet summary available.
        </Alert>
      )}
    </Container>
  );
};

export default BetSummary;
