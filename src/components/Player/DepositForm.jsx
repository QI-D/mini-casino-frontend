import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { depositFunds } from '../../redux/thunks';
import {
  Button,
  NumberInput,
  Card,
  Text,
  Alert,
  Loader
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const DepositForm = ({ onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const { loading, error, balance } = useSelector((state) => state.player);
  const token = localStorage.getItem('authToken');

  const handleDeposit = async () => {
    if (!amount || amount <= 0) {
      setLocalError('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      await dispatch(depositFunds(token, parseFloat(amount)));
      setAmount('');
      onSuccess();
    } catch (err) {
      setLocalError(err.message);
    }
  };

  const handleAmountChange = (value) => {
    if (value >= 0) {
      setAmount(value);
      setLocalError('');
    } else {
      setLocalError('Amount cannot be negative.');
    }
  };

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700} align="center" mb="md">
        Deposit Funds
      </Text>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
          {error}
        </Alert>
      )}

      {localError && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
          {localError}
        </Alert>
      )}

      {loading ? (
        <Loader size="sm" color="blue" style={{ margin: 'auto', display: 'block' }} />
      ) : (
        <>
          <NumberInput
            value={amount}
            onChange={handleAmountChange}
            label="Amount"
            placeholder="Enter deposit amount"
            min={1}
            step={1}
            precision={2}
            required
          />

          <Button
            onClick={handleDeposit}
            fullWidth
            mt="md"
            color="blue"
            loading={loading}
          >
            Deposit
          </Button>
        </>
      )}

      <Text align="center" size="sm" mt="lg" c="dimmed">
        Current Balance: <strong>${balance.toFixed(2)}</strong>
      </Text>
    </Card>
  );
};

export default DepositForm;
