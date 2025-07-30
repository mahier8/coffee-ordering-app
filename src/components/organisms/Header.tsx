/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex; justify-content: space-between; align-items: center;
`;
const NavLinks = styled.nav`
  a { color: ${({ theme }) => theme.colors.white}; margin-left: 16px; text-decoration: none; &:hover { text-decoration: underline; } }
`;

export function Header() {
  return (
    <HeaderWrapper>
      <h1>CoffeeTime ☕</h1>
      <NavLinks>
        <Link to="/">Menu</Link>
        <Link to="/payment">Cart</Link>
      </NavLinks>
    </HeaderWrapper>
  );
}
