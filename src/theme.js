import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    brand: [
      '#f0f9ff',
      '#e0f2fe',
      '#bae6fd',
      '#7dd3fc',
      '#38bdf8',
      '#0ea5e9',
      '#0284c7',
      '#0369a1',
      '#075985',
      '#0c4a6e',
    ],
  },
  primaryColor: 'brand',
  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  components: {
    Container: {
      defaultProps: {
        size: 'xs',
      },
    },
  },
});