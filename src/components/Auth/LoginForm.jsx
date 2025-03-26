import React, {useState}  from 'react';
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
  Paper
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconAlertCircle } from '@tabler/icons-react';

const LoginForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState('');

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    }
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(loginUser(values));
      onSuccess();
    } catch (error) {
      setLocalError(error.message);
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

            {localError && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
                {localError}
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
              loading={form.submitting}
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