/** @format */

import { createTheming } from '@callstack/react-theme-provider';

export const themes = {
  default: {
    colors: {
      primary: '#902726',
      lineColor: '#f9f9f9',
      background: '#ffffff',
      accent: 'yellow',
      placeholder: 'rgba(0,0,0,0.4)',
      category: '#f4d5d5',
    },
    dark: false,
  },
  dark: {
    colors: {
      text: 'rgba(255, 255, 255, 0.9)',
      primary: '#811927',
      accent: 'yellow',
      lineColor: '#383A46',
      background: '#222229', // '#242424' // '#232D4C'
      placeholder: 'rgba(254,254,254,0.4)',
    },
    dark: true,
  },
};

const { ThemeProvider, withTheme } = createTheming(themes.default);

export { ThemeProvider, withTheme };
