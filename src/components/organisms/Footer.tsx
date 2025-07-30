/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export function Footer() {
  return <FooterWrapper>© {new Date().getFullYear()} CoffeeTime</FooterWrapper>;
}
