import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Colour-only transitions, scoped so they never fight GSAP transforms */
  body, section, footer, nav, header, article, aside,
  a, button, li, span, p, h1, h2, h3, h4, h5, h6, div[class] {
    transition:
      background-color ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out},
      border-color     ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out};
  }

  .gsap-reveal, .gsap-char, .gsap-word { transition: none !important; }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color:            ${({ theme }) => theme.colors.text};
    font-family:      ${({ theme }) => theme.font.body};
    font-size:        1rem;
    font-weight:      400;
    line-height:      ${({ theme }) => theme.leading.normal};
    letter-spacing:   -0.005em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'ss01';
    overflow-x: hidden;
    cursor: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family:    ${({ theme }) => theme.font.display};
    font-weight:    ${({ theme }) => theme.weight.bold};
    line-height:    ${({ theme }) => theme.leading.tight};
    letter-spacing: ${({ theme }) => theme.tracking.tight};
    text-wrap: balance;
  }

  p { text-wrap: pretty; }

  a      { color: inherit; text-decoration: none; }
  img    { display: block; max-width: 100%; }
  button { cursor: none; border: none; background: none; font-family: inherit; color: inherit; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }

  ::-webkit-scrollbar       { width: 8px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.bgSubtle}; }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderHover};
    border-radius: 9999px;
  }
  ::-webkit-scrollbar-thumb:hover { background: ${({ theme }) => theme.colors.accent}; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Touch devices get the native pointer back */
  @media (hover: none) {
    body, button { cursor: auto; }
  }
`;
