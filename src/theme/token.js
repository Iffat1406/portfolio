export const tokens = {
  colors: {
    black:   '#0a0a0a',
    white:   '#f5f5f0',
    grey100: '#1a1a1a',
    grey200: '#2a2a2a',
    grey500: '#888888',
    grey800: '#cccccc',
    accent:  '#ff4d00',      // your brand accent
    accentHover: '#e63d00',
  },

  font: {
    display:  '"Neue Montreal", sans-serif',
    body:     '"DM Sans", sans-serif',
    mono:     '"JetBrains Mono", monospace',
  },

  size: {
    xs:  '0.75rem',   // 12px
    sm:  '0.875rem',  // 14px
    md:  '1rem',      // 16px
    lg:  '1.25rem',   // 20px
    xl:  '1.5rem',    // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4.5rem',  // 72px
    '5xl': '6rem',    // 96px
    '6xl': '8rem',    // 128px
  },

  weight: {
    light:   300,
    regular: 400,
    medium:  500,
    bold:    700,
  },

  leading: {
    tight:  1.1,
    normal: 1.5,
    loose:  1.8,
  },

  tracking: {
    tight:  '-0.04em',
    normal: '0em',
    wide:   '0.1em',
    wider:  '0.2em',
  },

  space: {
    1:  '0.25rem',
    2:  '0.5rem',
    3:  '0.75rem',
    4:  '1rem',
    6:  '1.5rem',
    8:  '2rem',
    12: '3rem',
    16: '4rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
  },

  radius: {
    sm:   '4px',
    md:   '8px',
    lg:   '16px',
    full: '9999px',
  },

  ease: {
    out:     'cubic-bezier(0.16, 1, 0.3, 1)',
    in:      'cubic-bezier(0.4, 0, 1, 1)',
    inOut:   'cubic-bezier(0.87, 0, 0.13, 1)',
    spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },

  duration: {
    fast:   '200ms',
    base:   '400ms',
    slow:   '700ms',
    xslow:  '1200ms',
  },

  zIndex: {
    base:     0,
    raised:   10,
    overlay:  100,
    modal:    200,
    cursor:   999,
    loader:   1000,
  },

  breakpoint: {
    sm:  '480px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    xxl: '1600px',
  },
};