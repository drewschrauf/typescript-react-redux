import { style } from '@vanilla-extract/css';
import { Sizes } from './theme.css';

export const pageWrapper = style({
  width: '100%',
  maxWidth: `${Sizes.md}px`,
});
