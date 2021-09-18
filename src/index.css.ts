import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('*, *:before, *:after', {
  boxSizing: 'border-box',
});

globalStyle('body', {
  width: '100%',
  backgroundColor: 'papayawhip',
  fontFamily: 'monospace',
  margin: '0',
  padding: '10px',
});

globalStyle('a, a:visited', {
  color: '#0000ee',
  textDecoration: 'none',
});
globalStyle('a:hover', {
  textDecoration: 'underline',
});

export const rootStyle = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});
