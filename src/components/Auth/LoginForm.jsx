import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/thunks';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Stack, 
  Alert,
  Container,
  Title,
  Paper,
  Box
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconAlertCircle } from '@tabler/icons-react';

const LoginForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.length < 3 ? 'Username must be at least 3 characters' : null),
      password: (value) => (value.length < 5 ? 'Password must be at least 5 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(loginUser(values));
      onSuccess();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title order={2} ta="center" mb="xl">
          Login
        </Title>
        
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {error && (
              <Alert 
                icon={<IconAlertCircle size={16} />} 
                title="Error" 
                color="red"
                mb="md"
              >
                {error}
              </Alert>
            )}
            
            <TextInput
              label="Username"
              placeholder="Your username"
              icon={<IconAt size={16} />}
              {...form.getInputProps('username')}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              icon={<IconLock size={16} />}
              {...form.getInputProps('password')}
              required
              mt="md"
            />

            <Button 
              type="submit" 
              fullWidth 
              mt="xl"
              loading={form.isSubmitting}
            >
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;