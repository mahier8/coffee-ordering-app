/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtoms";
import { Layout } from "../components/organisms/Layout";
import { Button } from "../components/atoms/Button";

const items = [
  { id: 1, name: "Espresso", price: 3.5 },
  { id: 2, name: "Latte", price: 4.0 },
  { id: 3, name: "Cappuccino", price: 4.2 },
];

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const item = items.find(i => i.id === Number(id));
  const navigate = useNavigate();
  const [cart, setCart] = useAtom(cartAtom);

  const confirmOrder = () => {
    if (item) {
      const updatedCart = [...cart, item];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      navigate("/payment");
    }
  };

  if (!item) return <p>Item not found</p>;

  return (
    <Layout>
      <div css={css`text-align: center; max-width: 400px; margin: 40px auto;`}>
        <h2>Confirm Your Order</h2>
        <p style={{ margin: "20px 0" }}>{item.name} - ${item.price}</p>
        <Button onClick={confirmOrder} fullWidth>Confirm Order</Button>
      </div>
    </Layout>
  );
}
