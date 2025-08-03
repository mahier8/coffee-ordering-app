/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtoms";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/organisms/Layout";
import { Button } from "../components/atoms/Button";

export default function PaymentPage() {
  const [cart, setCart] = useAtom(cartAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  
  const discount = subtotal > 20 ? 5 : 0; // Example: $5 discount if subtotal > $20
  const total = subtotal - discount;

  const confirmPayment = () => {
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/success");
  };

  return (
    <Layout>
      <div css={css`max-width: 500px; margin: auto;`}>
        <h2 css={css`text-align: center; margin-bottom: 20px;`}>Your Cart</h2>

        {cart.length === 0 ? (
          <p css={css`text-align: center;`}>Your cart is empty</p>
        ) : (
          <>
            {/* 🛒 Cart Items Section */}
            <div css={css`
              background: #fff;
              padding: 16px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              margin-bottom: 20px;
            `}>
              {cart.map((item, idx) => (
                <div key={idx} css={cartItemRow}>
                  <div css={cartItemInfo}>
                    <img 
                      src={`/images/${item.image}`} 
                      alt={item.name} 
                      css={cartItemImage} 
                    />
                    <span>{item.name} x {item.quantity}</span>
                  </div>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

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
      </div>
    </Layout>
  );
}

const cartItemRow = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

const cartItemInfo = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const cartItemImage = css`
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
