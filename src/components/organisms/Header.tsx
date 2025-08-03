/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// icons
import { MdRestaurantMenu } from "react-icons/md";


// jotai
// import { useAtomValue } from "jotai";
// import { cartAtom } from "../../store/cartAtoms";

// components
import { CartIconWithBadge } from "../atoms/CartIconWithBadge";

export function Header() {

  // jotai
  // const cart = useAtomValue(cartAtom);

  return (
    <HeaderWrapper>
      <h1>Quick Coffee ☕</h1>
      {/* <QuickCoffeeLogo src="../../../public/images/QuickCoffeeLogo2.png" /> */}
      <NavLinks>
        <Link to="/" title="Menu">
          <MenuIcon size={28} />
        </Link>
        <Link to="/payment" title="Cart">
        {/* Cart({cart.length}) */}
          <CartIconWithBadge />
        </Link>
      </NavLinks>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000; /* Make sure it's above other content */
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 16px; /* space between links */

  a {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    text-decoration: none;
    gap: 6px; /* space between icon and text (if text is added) */

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MenuIcon = styled(MdRestaurantMenu)`
  // font-size: 28px;
  // color: white;
  margin-bottom: 3px;
`;

// const QuickCoffeeLogo = styled.img`
//   width: 60px;
//   height: 50px;
// `;
