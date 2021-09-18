import { style } from '@vanilla-extract/css';

export const wrapperStyle = style({
  marginBottom: '10px',
});

export const dropdownLinkStyle = style({
  selectors: {
    '&:after': {
      content: "'▼'",
    },
  },
});

export const linkWrapperStyle = style({
  position: 'relative',
  display: 'inline-block',
  marginRight: '5px',
});

export const linkListStyle = style({
  position: 'absolute',
  border: '1px solid black',
  backgroundColor: 'papayawhip',

  padding: '10px',
  width: '70px',
  margin: '0',

  visibility: 'hidden',
  opacity: '0',
  transition: 'all 0.3s ease',

  selectors: {
    [`${linkWrapperStyle}:hover &`]: {
      visibility: 'visible',
      opacity: '1',
    },
  },
});

export const linkListItemStyle = style({
  listStyle: 'none',
});
