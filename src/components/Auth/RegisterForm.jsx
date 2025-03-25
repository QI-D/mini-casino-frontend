import React from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/thunks';
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconCalendar, IconUser } from '@tabler/icons-react';

const RegisterForm = ({ onSuccess }) => {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      birthdate: null,
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      birthdate: (value) => {
        if (!value) return 'Birthdate is required';
        const ageDiff = Date.now() - value.getTime();
        const ageDate = new Date(ageDiff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        return age < 18 ? 'You must be at least 18 years old' : null;
      },
    },
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser(values));
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Username"
          placeholder="Your username"
          icon={<IconUser size={16} />}
          required
          {...form.getInputProps('username')}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          icon={<IconLock size={16} />}
          required
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your password"
          icon={<IconLock size={16} />}
          required
          {...form.getInputProps('confirmPassword')}
        />

        <DateInput
          label="Birthdate"
          placeholder="Select your birthdate"
          icon={<IconCalendar size={16} />}
          maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
          required
          {...form.getInputProps('birthdate')}
        />

        <Button type="submit" fullWidth mt="md">
          Register
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
