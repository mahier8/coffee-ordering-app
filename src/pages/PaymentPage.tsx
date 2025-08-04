/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtoms";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { FaTrash } from "react-icons/fa";

// components
import { Layout } from "../components/organisms/Layout";
import { Button } from "../components/atoms/Button";
import { ConfirmModal } from "../components/molecules/ConfirmModal";

export default function PaymentPage() {
  const [cart, setCart] = useAtom(cartAtom);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  
  const discount = subtotal > 20 ? 5 : 0; // Example: $5 discount if subtotal > $20
  
  const total = subtotal - discount;

  // increasing/decreasing item quantity
  const increaseQty = (id: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQty = (id: number) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // item removal
  const removeItem = (id: number) => {
    if (cart.length === 1) {
      // If there's only 1 item, show modal before removing
      setItemToRemove(id);
      setModalOpen(true);
    } else {
      // Otherwise, remove immediately
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
    }
  };

  const confirmRemove = () => {
    if (itemToRemove === null) return;

    const updatedCart = cart.filter(item => item.id !== itemToRemove);
    setCart(updatedCart);

    setModalOpen(false);
    setItemToRemove(null);

    if (updatedCart.length === 0) {
      localStorage.removeItem("cart"); // ✅ completely clear when empty
      setTimeout(() => navigate("/"), 500); // smoother redirect
    }
  };

  const cancelRemove = () => {
    setModalOpen(false);
    setItemToRemove(null);
  };

  // confirming orders
  const confirmPayment = () => {
    // copy cart data before clearing
    const orderSummary = [...cart]; 

    localStorage.removeItem("cart");
    setCart([]);

    navigate("/success", { state: { orderSummary } });
  };



  return (
    <Layout>
      <PaymentInner>
        <PaymentHeader>Confirm Your Order</PaymentHeader>

        {cart.length === 0 ? (
          <NoDataPar>Your cart is empty</NoDataPar>
        ) : (
          <>
            {/* 🛒 Cart Items Section */}
            <CartList>
              {cart.map((item, idx) => (
                <CartItemRow key={idx}>
                  <CartItemInfo>
                    <CartItemImage 
                      src={`/images/${item.image}`} 
                      alt={item.name} 
                    />
                    <span>{item.name} 
                      {/* <QuantitySpan> x{item.quantity}</QuantitySpan> */}
                    </span>
                  </CartItemInfo>

                    <ItemActions>

                      <QtyControls>
                        <button onClick={() => decreaseQty(item.id)}>-</button>
                          <QuantitySpan>{item.quantity}</QuantitySpan>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </QtyControls>
                      <span>${item.price.toFixed(2)}</span>
                      <DeleteButton onClick={() => removeItem(item.id)}>
                        <FaTrash />
                      </DeleteButton>

                    </ItemActions>

                </CartItemRow>
              ))}
            </CartList>

            {/* 💰 Payment Summary Section */}
            <div css={css`
              background: #f8f8f8;
              padding: 16px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.05);
              margin-bottom: 20px;
            `}>
              <div css={summaryRow}> <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span> </div>
              <div css={summaryRow}> <span>Discount</span> <span>-${discount.toFixed(2)}</span> </div>
              <div css={summaryRowStrong}> <span>Total</span> <span>${total.toFixed(2)}</span> </div>
            </div>

            <Button onClick={confirmPayment} fullWidth>Confirm Payment</Button>
          </>
        )}
        <ConfirmModal
          isOpen={modalOpen}
          title="Confirm Remove"
          message="Are you sure you want to remove this item from your cart?"
          onConfirm={confirmRemove}
          onCancel={cancelRemove}
        />
      </PaymentInner>
    </Layout>
  );
}

const PaymentInner = styled.div`
  max-width: 500px; 
  margin: auto;
`;

const PaymentHeader = styled.h2`
  text-align: center; 
  margin-bottom: 20px;
`;

const NoDataPar = styled.h2`
  text-align: center;
`;

const CartList = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 20px;
`;

const CartItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const CartItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CartItemImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #ddd;
`;

const summaryRow = css`
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
  font-size: 16px;
`;

const summaryRowStrong = css`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 18px;
  font-weight: bold;
`;

const QuantitySpan = styled.span`
  font-weight: bold;
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto; /* Push actions to the far right */
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
    background: white;
    cursor: pointer;
    font-size: 16px;
    line-height: 0;
    border-radius: 50%;
    font-weight: bold;

    &:hover {
      background: #eee;
    }
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #6B4F4F;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color:rgb(73, 55, 55);
  }
`;
