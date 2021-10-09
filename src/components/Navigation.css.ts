import { vars } from '@/theme.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  marginBottom: '10px',
});

export const dropdownLink = style({
  selectors: {
    '&:after': {
      content: "'▼'",
    },
  },
});

export const linkWrapper = style({
  position: 'relative',
  display: 'inline-block',
  marginRight: '5px',
});

export const linkList = style({
  position: 'absolute',
  border: '1px solid black',
  backgroundColor: vars.color.background,

  padding: '10px',
  width: '70px',
  margin: '0',

  visibility: 'hidden',
  opacity: '0',
  transition: 'all 0.3s ease',

  selectors: {
    [`${linkWrapper}:hover &`]: {
      visibility: 'visible',
      opacity: '1',
    },
  },
});

export const linkListItem = style({
  listStyle: 'none',
});
