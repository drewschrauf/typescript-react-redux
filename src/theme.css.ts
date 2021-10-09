import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    background: '#FBFBFB',
    link: '#0000EE',
  },
  font: {
    primary: 'Arial',
  },
});

export enum Sizes {
  sm = 576,
  md = 768,
}
