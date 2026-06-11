import { tokens } from './token';

const shared = {
  font:       tokens.font,
  size:       tokens.size,
  weight:     tokens.weight,
  leading:    tokens.leading,
  tracking:   tokens.tracking,
  space:      tokens.space,
  radius:     tokens.radius,
  ease:       tokens.ease,
  duration:   tokens.duration,
  zIndex:     tokens.zIndex,
  breakpoint: tokens.breakpoint,
};

export const darkTheme = {
  ...shared,
  mode: 'dark',
  colors: {
    bg:          '#0a0a0a',
    bgSubtle:    '#111111',
    bgElevated:  '#1a1a1a',
    bgHover:     '#222222',
    text:        '#f5f5f0',
    textMuted:   '#888888',
    textSubtle:  '#555555',
    border:      '#222222',
    borderHover: '#444444',
    accent:      '#ff4d00',
    accentHover: '#e63d00',
    accentText:  '#ffffff',
    // navbar, footer, card etc.
    surface:     'rgba(255,255,255,0.04)',
    surfaceHover:'rgba(255,255,255,0.08)',
    overlay:     'rgba(0,0,0,0.8)',
    shadow:      '0 8px 32px rgba(0,0,0,0.4)',
  },
};

export const lightTheme = {
  ...shared,
  mode: 'light',
  colors: {
    bg:          '#f5f5f0',
    bgSubtle:    '#eeeeea',
    bgElevated:  '#e5e5e0',
    bgHover:     '#ddddd8',
    text:        '#0a0a0a',
    textMuted:   '#666666',
    textSubtle:  '#999999',
    border:      '#dddddd',
    borderHover: '#bbbbbb',
    accent:      '#ff4d00',
    accentHover: '#e63d00',
    accentText:  '#ffffff',
    surface:     'rgba(0,0,0,0.04)',
    surfaceHover:'rgba(0,0,0,0.08)',
    overlay:     'rgba(255,255,255,0.8)',
    shadow:      '0 8px 32px rgba(0,0,0,0.08)',
  },
};