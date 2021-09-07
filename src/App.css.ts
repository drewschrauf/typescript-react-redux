import { style } from '@vanilla-extract/css';
import { Sizes } from './styles';

export const pageWrapperStyle = style({
  width: '100%',
  maxWidth: `${Sizes.md}px`,
});
