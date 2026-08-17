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

// ─── Deep Ink + Electric Indigo ───────────────────────────────────────────────
// A two-accent system: indigo carries structure and links, cyan carries
// highlights, data and 3D light. Both read cleanly in either mode.

export const darkTheme = {
  ...shared,
  mode: 'dark',
  colors: {
    bg:          '#080B14',
    bgSubtle:    '#0B101C',
    bgElevated:  '#101728',
    bgHover:     '#161F35',

    text:        '#E9EDF7',
    textMuted:   '#95A2C0',
    textSubtle:  '#5D6A8B',

    border:      '#1A2336',
    borderHover: '#2F3D5C',

    accent:      '#6366F1',
    accentHover: '#818CF8',
    accent2:     '#22D3EE',
    accentText:  '#FFFFFF',
    accentSoft:  'rgba(99,102,241,0.14)',
    accentLine:  'rgba(99,102,241,0.38)',

    gradient:    'linear-gradient(120deg, #6366F1 0%, #818CF8 45%, #22D3EE 100%)',
    glow:        'radial-gradient(circle, rgba(99,102,241,0.20) 0%, rgba(34,211,238,0.08) 40%, transparent 68%)',

    surface:      'rgba(255,255,255,0.035)',
    surfaceHover: 'rgba(255,255,255,0.07)',
    overlay:      'rgba(8,11,20,0.82)',
    shadow:       '0 24px 70px -20px rgba(0,0,0,0.85)',
    shadowAccent: '0 22px 60px -22px rgba(99,102,241,0.55)',
    grain:        0.035,
  },
};

export const lightTheme = {
  ...shared,
  mode: 'light',
  colors: {
    bg:          '#FBFCFE',
    bgSubtle:    '#F2F5FB',
    bgElevated:  '#EAEFF8',
    bgHover:     '#E1E8F4',

    text:        '#0B1220',
    textMuted:   '#4C5871',
    textSubtle:  '#7C8AA3',

    border:      '#DEE5F0',
    borderHover: '#BAC6DC',

    accent:      '#4F46E5',
    accentHover: '#4338CA',
    accent2:     '#0891B2',
    accentText:  '#FFFFFF',
    accentSoft:  'rgba(79,70,229,0.09)',
    accentLine:  'rgba(79,70,229,0.30)',

    gradient:    'linear-gradient(120deg, #4F46E5 0%, #6366F1 45%, #0891B2 100%)',
    glow:        'radial-gradient(circle, rgba(79,70,229,0.14) 0%, rgba(8,145,178,0.06) 40%, transparent 68%)',

    surface:      'rgba(11,18,32,0.025)',
    surfaceHover: 'rgba(11,18,32,0.05)',
    overlay:      'rgba(251,252,254,0.82)',
    shadow:       '0 24px 60px -22px rgba(16,24,40,0.20)',
    shadowAccent: '0 22px 55px -24px rgba(79,70,229,0.35)',
    grain:        0.02,
  },
};
