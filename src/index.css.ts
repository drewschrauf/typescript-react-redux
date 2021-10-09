import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*, *:before, *:after', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  width: '100%',
  backgroundColor: vars.color.background,
  fontFamily: vars.font.primary,
  margin: '0',
  padding: '10px',
});

globalStyle('a, a:visited', {
  color: vars.color.link,
  textDecoration: 'none',
});
globalStyle('a:hover', {
  textDecoration: 'underline',
});

export const root = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
