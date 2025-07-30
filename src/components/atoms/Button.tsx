/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  background: ${({ theme, variant }) => variant === "secondary" ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 1rem;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  transition: background 0.3s;
  &:hover { background: ${({ theme }) => theme.colors.accent}; }
`;

export function Button({ children, onClick, variant = "primary", fullWidth }: ButtonProps) {
  return <StyledButton onClick={onClick} variant={variant} fullWidth={fullWidth}>{children}</StyledButton>;
}
