import React from 'react';
import { Modal, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const BaseModal = ({ show, onClose, title, content, size = 'md', icon: Icon, error }) => {
  return (
    <Modal
      opened={show}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={20} />}
          <span>{title}</span>
        </div>
      }
      size={size}
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
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          mb="md"
          withCloseButton
          onClose={onClose}
        >
          {error}
        </Alert>
      )}
      {content && React.cloneElement(content)}
    </Modal>
  );
};

export default BaseModal;
