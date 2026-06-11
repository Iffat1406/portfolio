import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* Smooth color transitions when switching theme */
    transition:
      background-color ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out},
      color            ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out},
      border-color     ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out},
      box-shadow       ${({ theme }) => theme.duration.base} ${({ theme }) => theme.ease.out};
  }

  /* Exclude GSAP-animated elements from theme transition 
     so animations don't interfere */
  .gsap-reveal,
  .gsap-char,
  .gsap-word {
    transition: none !important;
  }

  html { font-size: 16px; }

  body {
    background-color: ${({ theme }) => theme.colors.bg};
    color:            ${({ theme }) => theme.colors.text};
    font-family:      ${({ theme }) => theme.font.body};
    line-height:      ${({ theme }) => theme.leading.normal};
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    cursor: none;
  }

  h1,h2,h3,h4,h5,h6 {
    font-family:    ${({ theme }) => theme.font.display};
    font-weight:    ${({ theme }) => theme.weight.bold};
    line-height:    ${({ theme }) => theme.leading.tight};
    letter-spacing: ${({ theme }) => theme.tracking.tight};
  }

  a    { color: inherit; text-decoration: none; }
  img  { display: block; max-width: 100%; }
  button { cursor: none; border: none; background: none; font-family: inherit; }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: ${({ theme }) => theme.colors.bg}; }
  ::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.colors.accent}; }
`;