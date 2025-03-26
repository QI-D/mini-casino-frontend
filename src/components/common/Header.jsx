import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import BaseModal from './BaseModal';
import AuthTabs from '../Auth/AuthTabs';
import DepositForm from '../Player/DepositForm';
import BetSummary from '../Bet/BetSummary';
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
import { 
  IconLogin,
  IconLogout,
  IconWallet,
  IconReport,
  IconCoin
} from '@tabler/icons-react';

const AppHeader = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { balance } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    content: null,
    icon: null,
    size: 'md',
  });

  const openModal = (type) => {
    switch (type) {
      case 'auth':
        setModalData({
          show: true,
          title: 'Access Your Account',
          content: <AuthTabs onSuccess={closeModal} />,
          icon: IconLogin,
        });
        break;
      case 'deposit':
        setModalData({
          show: true,
          title: 'Deposit Funds',
          content: <DepositForm onSuccess={closeModal} />,
          icon: IconWallet,
        });
        break;
      case 'betSummary':
        setModalData({
          show: true,
          title: 'Bet Summary',
          content: <BetSummary onSuccess={closeModal} />,
          icon: IconReport,
          size: 'lg',
        });
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setModalData({ ...modalData, show: false });
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

          <Group gap="md">
            {isAuthenticated ? (
              <>
                <Group gap="xs" wrap="nowrap">
                  <Avatar color="blue" radius="xl" size="md">
                    {user.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box style={{ whiteSpace: 'nowrap' }}>
                    <Text fw={500} size="sm" c="dark.7" ta="center">
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
                  leftSection={<IconWallet size={16} color={theme.colors.white} />}
                  variant="outline"
                  color="blue.6"
                  size="compact-md"
                  onClick={() => openModal('deposit')}
                >
                  Deposit
                </Button>
                <Button
                  leftSection={<IconReport size={16} color={theme.colors.white} />}
                  variant="outline"
                  color="blue.6"
                  size="compact-md"
                  onClick={() => openModal('betSummary')}
                >
                  Bet Summary
                </Button>
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
                onClick={() => openModal('auth')}
              >
                Login / Register
              </Button>
            )}
          </Group>
        </Group>
      </Container>

      <BaseModal
        show={modalData.show}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
        icon={modalData.icon}
        size={modalData.size}
      />
    </AppShell.Header>
  );
};

export default AppHeader;
