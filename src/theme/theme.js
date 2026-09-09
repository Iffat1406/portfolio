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

// ─── Blush Atelier ────────────────────────────────────────────────────────────
// A pastel two-accent system: rose carries structure, links and emphasis;
// lavender carries highlights, data and 3D light. Light mode is the primary
// canvas — warm blush paper, plum ink. Dark mode is a deep plum dusk that keeps
// the same pastels rather than falling back to cold slate.
//
// `onGradient*` and `gridLine` are deliberately mode-independent: they sit on
// the pastel project cards, which keep the same tint in both palettes.

const onPastel = {
  onGradient:       '#3A2233',
  onGradientMuted:  'rgba(58,34,51,0.60)',
  gridLine:         'rgba(58,34,51,0.055)',
};

export const lightTheme = {
  ...shared,
  mode: 'light',
  colors: {
    bg:          '#FFFAFC',
    bgSubtle:    '#FDF2F7',
    bgElevated:  '#FFFFFF',
    bgHover:     '#FBE9F1',

    text:        '#3A2233',
    textMuted:   '#7A5C70',
    textSubtle:  '#886A7C',

    border:      '#EFD6E3',
    borderHover: '#E4C2D5',

    accent:      '#B94F82',
    accentHover: '#8E3159',
    accent2:     '#6F5AC6',
    accentText:  '#FFFFFF',
    accentSoft:  'rgba(185,79,130,0.10)',
    accentLine:  'rgba(185,79,130,0.32)',

    success:     '#268F6C',

    gradient:    'linear-gradient(120deg, #B94F82 0%, #A96BB8 50%, #6F5AC6 100%)',
    glow:        'radial-gradient(circle, rgba(247,200,220,0.55) 0%, rgba(190,170,240,0.20) 42%, transparent 70%)',

    // Flat colours (not gradients) — the page-wide pastel wash on <body>
    wash1:       'rgba(247,200,220,0.30)',
    wash2:       'rgba(188,169,246,0.20)',

    surface:      'rgba(58,34,51,0.025)',
    surfaceHover: 'rgba(58,34,51,0.055)',
    overlay:      'rgba(255,250,252,0.85)',
    shadow:       '0 24px 60px -22px rgba(150,90,120,0.22)',
    shadowAccent: '0 22px 55px -24px rgba(185,79,130,0.38)',
    grain:        0.018,

    ...onPastel,
  },
};

export const darkTheme = {
  ...shared,
  mode: 'dark',
  colors: {
    bg:          '#18101F',
    bgSubtle:    '#1E1527',
    bgElevated:  '#261B31',
    bgHover:     '#30233C',

    text:        '#F7EEF5',
    textMuted:   '#C3AAC2',
    textSubtle:  '#8C748C',

    border:      '#2E2039',
    borderHover: '#4C3757',

    accent:      '#F2A2C4',
    accentHover: '#F8BED7',
    accent2:     '#BCA9F6',
    accentText:  '#2A1522',
    accentSoft:  'rgba(242,162,196,0.13)',
    accentLine:  'rgba(242,162,196,0.36)',

    success:     '#7FE3C0',

    gradient:    'linear-gradient(120deg, #F2A2C4 0%, #DCB0EE 50%, #BCA9F6 100%)',
    glow:        'radial-gradient(circle, rgba(242,162,196,0.20) 0%, rgba(188,169,246,0.10) 42%, transparent 68%)',

    // Flat colours (not gradients) — the page-wide pastel wash on <body>
    wash1:       'rgba(242,162,196,0.10)',
    wash2:       'rgba(188,169,246,0.09)',

    surface:      'rgba(255,255,255,0.04)',
    surfaceHover: 'rgba(255,255,255,0.075)',
    overlay:      'rgba(24,16,31,0.84)',
    shadow:       '0 24px 70px -20px rgba(10,4,16,0.80)',
    shadowAccent: '0 22px 60px -22px rgba(242,162,196,0.35)',
    grain:        0.03,

    ...onPastel,
  },
};
