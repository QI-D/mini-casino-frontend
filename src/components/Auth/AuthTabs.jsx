import React, { useState } from 'react';
import { Tabs, Box } from '@mantine/core';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthTabs = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
      <Tabs.List grow>
        <Tabs.Tab value="login">Login</Tabs.Tab>
        <Tabs.Tab value="register">Register</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="login" pt="md">
        <Box p="md">
          <LoginForm onSuccess={onSuccess} />
        </Box>
      </Tabs.Panel>

      <Tabs.Panel value="register" pt="md">
        <Box p="md">
          <RegisterForm onSuccess={onSuccess} />
        </Box>
      </Tabs.Panel>
    </Tabs>
  );
};

export default AuthTabs;
