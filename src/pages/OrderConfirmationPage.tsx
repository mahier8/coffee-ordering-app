/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtoms";
import { Layout } from "../components/organisms/Layout";
import { Button } from "../components/atoms/Button";

const items = [
  { id: 1, name: "Espresso (Sale)", price: 2.5, image: "espresso_image.jpeg" },
  { id: 2, name: "Latte (Sale)", price: 3.0, image: "latte_image.jpeg" },
  { id: 3, name: "Rooibos tea (Sale)", price: 2.2, image: "rooibos_tea_image.jpeg" },
  { id: 4, name: "Iced coffee (Sale)", price: 3.5, image: "iced_coffee_image.jpeg" },
  { id: 5, name: "Cappuccino", price: 4.2, image: "cappuccino_image.jpeg" },
  { id: 6, name: "Americano", price: 4.0, image: "americano_image.jpeg" },
  { id: 7, name: "Mocha", price: 4.5, image: "mocha_image.jpeg" },
  { id: 8, name: "Affogato", price: 4.8, image: "affogato_image.jpeg" },
  { id: 9, name: "Green tea", price: 4.0, image: "green_tea_image.jpeg" },
  { id: 10, name: "Black tea", price: 4.0, image: "black_tea_image.jpeg" },

];

// const saleItems = [
//   { id: 1, name: "Espresso (Sale)", price: 2.5, image: "espresso_image.jpeg" },
//   { id: 2, name: "Latte (Sale)", price: 3.0, image: "latte_image.jpeg" },
//   { id: 3, name: "Rooibos tea (Sale)", price: 2.2, image: "rooibos_tea_image.jpeg" },
//   { id: 4, name: "Iced coffee (Sale)", price: 3.5, image: "iced_coffee_image.jpeg" },
// ];

// const regularItems = [
//   { id: 5, name: "Cappuccino", price: 4.2, image: "cappuccino_image.jpeg" },
//   { id: 6, name: "Americano", price: 4.0, image: "americano_image.jpeg" },
//   { id: 7, name: "Mocha", price: 4.5, image: "mocha_image.jpeg" },
//   { id: 8, name: "Affogato", price: 4.8, image: "affogato_image.jpeg" },
//   { id: 9, name: "Green tea", price: 4.0, image: "green_tea_image.jpeg" },
//   { id: 10, name: "Black tea", price: 4.0, image: "black_tea_image.jpeg" },
// ];

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
      navigate("/");
    }
  };

  if (!item) return <p>Item not found</p>;

  return (
    <Layout>
      <div css={css`text-align: center; max-width: 400px; margin: 40px auto;`}>
        <h4>Confirm Your Order</h4>
        <h2 style={{ margin: "20px 0" }}>{item.name} - ${item.price}</h2>
        <img src={`/images/${item.image}`} alt="" />
        <Button onClick={confirmOrder} fullWidth>Confirm Order</Button>
      </div>
    </Layout>
  );
}
