import { Sizes } from '@/styles';
import { style } from '@vanilla-extract/css';

export const wrapperStyle = style({
  padding: '10px',
  border: '1px dashed black',
});

export const buttonWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  '@media': {
    [`screen and (min-width: ${Sizes.sm}px)`]: {
      flexDirection: 'row',
    },
  },
});

export const buttonStyle = style({
  flex: 1,
  flexBasis: '32px',
  fontFamily: 'inherit',

  selectors: {
    '&:not(:last-child)': {
      margin: '0 0 5px',
    },
  },

  '@media': {
    [`screen and (min-width: ${Sizes.sm}px)`]: {
      flexBasis: 'initial',
      height: '32px',
      selectors: {
        '&:not(:last-child)': {
          margin: '0 10px 0 0',
        },
      },
    },
  },
});
