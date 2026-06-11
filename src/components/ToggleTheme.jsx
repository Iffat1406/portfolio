import { useRef, useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { useTheme } from "../theme/AppTheme";

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
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.font.body};
  font-size: ${({ theme }) => theme.size.sm};
  letter-spacing: ${({ theme }) => theme.tracking.wide};
  text-transform: uppercase;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Icon = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.size.md};
`;

const Label = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default ThemeToggle;
