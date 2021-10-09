import { keyframes, style } from '@vanilla-extract/css';

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const spinner = style({
  width: '64px',
  height: '64px',
  margin: '0 auto',

  ':after': {
    content: ' ',
    display: 'block',
    width: '46px',
    height: '46px',
    margin: '1px',
    borderRadius: '50%',
    border: '5px solid black',
    borderColor: 'black transparent black transparent',
    animation: `${spin} 1.2s linear infinite`,
  },
});
