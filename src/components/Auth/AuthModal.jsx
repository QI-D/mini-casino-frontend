import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../redux/slices/authSlice';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Modal, Tabs, Alert } from '@mantine/core';
import { IconX, IconLogin, IconUserPlus } from '@tabler/icons-react';

const AuthModal = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearError());
    onClose();
  };

  const handleTabChange = (newTab) => {
    dispatch(clearError());
    setActiveTab(newTab);
  };

  return (
    <Modal
      opened={show}
      onClose={handleClose}
      title={activeTab === 'login' ? 'Login to your account' : 'Create new account'}
      size="md"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{
        transition: 'fade',
        duration: 200,
      }}
    >
      {error && (
        <Alert
          icon={<IconX size={18} />}
          title="Error"
          color="red"
          mb="md"
          withCloseButton
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.List grow>
          <Tabs.Tab
            value="login"
            leftSection={<IconLogin size={16} />}
            fw={500}
          >
            Login
          </Tabs.Tab>
          <Tabs.Tab
            value="register"
            leftSection={<IconUserPlus size={16} />}
            fw={500}
          >
            Register
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="login" pt="md">
          <LoginForm onSuccess={handleClose} />
        </Tabs.Panel>

        <Tabs.Panel value="register" pt="md">
          <RegisterForm onSuccess={handleClose} />
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;