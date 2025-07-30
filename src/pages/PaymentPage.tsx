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

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const confirmPayment = () => {
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/success");
  };

  return (
    <Layout>
      <div css={css`max-width: 500px; margin: auto; text-align: center;`}>
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty</p> : (
          <>
            <ul css={css`list-style: none; padding: 0; margin: 20px 0;`}>
              {cart.map((item, idx) => (
                <li key={idx} css={css`margin-bottom: 10px;`}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Button onClick={confirmPayment} fullWidth>Confirm Payment</Button>
          </>
        )}
      </div>
    </Layout>
  );
}