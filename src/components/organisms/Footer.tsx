/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export function Footer() {
  return <FooterWrapper>© {new Date().getFullYear()} CoffeeTime</FooterWrapper>;
}

const FooterWrapper = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 1000; /* Make sure it's above other content */
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;