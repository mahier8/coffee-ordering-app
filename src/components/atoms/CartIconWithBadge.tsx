import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { FaShoppingCart } from "react-icons/fa";
import { useAtomValue } from "jotai";
import { cartAtom } from "../../store/cartAtoms";
import { AlertModal } from "../molecules/AlertModal"; 

export function CartIconWithBadge() {
  const cart = useAtomValue(cartAtom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCartClick = () => {
    if (cart.length === 0) {
      setModalOpen(true); 
    } else {
      navigate("/payment");
    }
  };

  return (
    <>
      <CartWrapper onClick={handleCartClick}>
        <CartIcon />
        {cart.length > 0 && <CartBadge animate={true}>{cart.length}</CartBadge>}
      </CartWrapper>

      <AlertModal
        isOpen={modalOpen}
        message="Your cart is empty! Please add items before checking out."
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

// Animation for badge bounce when item added
const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const CartWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartIcon = styled(FaShoppingCart)`
  font-size: 28px;
  color: white;
  margin-top: 3px;

  &:hover {
    transform: scale(1.2); /* Slightly enlarges */
    text-shadow: 0 0 8px rgba(255, 209, 102, 0.8);
  }
`;

const CartBadge = styled.span<{ animate: boolean }>`
  position: absolute;
  top: -4px; /* lowered from -8px to -4px */
  right: -6px;
  background: #e63946;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  animation: ${({ animate }) => (animate ? bounce : "none")} 0.4s ease;
`;
