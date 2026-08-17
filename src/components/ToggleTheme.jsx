import { useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { useTheme } from "../theme/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const iconRef = useRef(null);

  const handleToggle = () => {
    // Spin + scale on click
    gsap.fromTo(
      iconRef.current,
      { rotate: 0, scale: 1 },
      {
        rotate: 360,
        scale: 1.2,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => gsap.set(iconRef.current, { rotate: 0 }),
      },
    );
    toggleTheme();
  };

  return (
    <Button onClick={handleToggle} aria-label="Toggle theme">
      <Icon ref={iconRef}>{isDark ? "☀" : "☾"}</Icon>
      <Label>{isDark ? "Light" : "Dark"}</Label>
    </Button>
  );
};

const Button = styled.button`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Icon = styled.span`
  display: inline-block;
  font-size: 0.95rem;
  line-height: 1;
`;

const Label = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
`;

export default ThemeToggle;
