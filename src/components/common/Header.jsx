import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import AuthModal from '../Auth/AuthModal';
import {
  AppShell,
  Group,
  Button,
  Text,
  Avatar,
  Title,
  Container,
  useMantineTheme,
  Box,
  rem,
} from '@mantine/core';
import { IconLogin, IconLogout, IconCoin } from '@tabler/icons-react';

const AppHeader = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <AppShell.Header
      withBorder={false}
      style={{
        backgroundColor: theme.colors.gray[1],
        height: rem(60),
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container size="xl" style={{ width: '100%' }}>
        <Group justify="space-between" style={{ width: '100%' }}>
          <Title
            order={3}
            component={Link}
            to="/"
            style={{
              color: theme.colors.dark[7],
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            Mini Casino
          </Title>

          <Group gap="xl" visibleFrom="sm">
            <Button
              component={Link}
              to="/"
              variant="subtle"
              color="dark.7"
              size="compact-md"
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/games"
              variant="subtle"
              color="dark.7"
              size="compact-md"
            >
              Games
            </Button>
          </Group>

          <Group gap="md">
            {isAuthenticated ? (
              <>
                <Group gap="xs" wrap="nowrap">
                  <Avatar color="blue" radius="xl" size="sm">
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box style={{ whiteSpace: 'nowrap' }}>
                    <Text fw={500} size="sm" c="dark.7">
                      {user.username}
                    </Text>
                    <Group gap={4}>
                      <IconCoin size={16} color={theme.colors.dark[5]} />
                      <Text size="sm" c="dark.7">
                        ${balance.toFixed(2)}
                      </Text>
                    </Group>
                  </Box>
                </Group>
                <Button
                  leftSection={<IconLogout size={16} color={theme.colors.red[7]} />}
                  variant="outline"
                  color="red.7"
                  size="compact-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                leftSection={<IconLogin size={16} color={theme.colors.white} />}
                variant="filled"
                color="blue.6"
                size="compact-md"
                onClick={() => setShowAuthModal(true)}
              >
                Login / Register
              </Button>
            )}
          </Group>
        </Group>
      </Container>

      <AuthModal show={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </AppShell.Header>
  );
};

export default AppHeader;