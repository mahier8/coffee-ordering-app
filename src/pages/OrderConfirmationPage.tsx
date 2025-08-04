/** @jsxImportSource @emotion/react */
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cartAtoms";
import { Layout } from "../components/organisms/Layout";
import { Button } from "../components/atoms/Button";
import styled from "@emotion/styled";

// icon
import { FaArrowLeft } from "react-icons/fa"; // import back arrow icon

const items = [
  { id: 1, name: "Espresso (Sale)", price: 2.5, image: "espresso_image.jpeg", description: "A strong and rich coffee shot, perfect for a quick boost." },
  { id: 2, name: "Latte (Sale)", price: 3.0, image: "latte_image.jpeg", description: "Smooth espresso blended with steamed milk for a creamy finish." },
  { id: 3, name: "Rooibos tea (Sale)", price: 2.2, image: "rooibos_tea_image.jpeg", description: "Naturally caffeine-free herbal tea with a sweet, nutty flavor." },
  { id: 4, name: "Iced coffee (Sale)", price: 3.5, image: "iced_coffee_image.jpeg", description: "Chilled coffee served over ice, refreshing and bold." },
  { id: 5, name: "Cappuccino", price: 4.2, image: "cappuccino_image.jpeg", description: "Espresso topped with frothy milk foam for a perfect balance." },
  { id: 6, name: "Americano", price: 4.0, image: "americano_image.jpeg", description: "A smooth and rich espresso diluted with hot water." },
  { id: 7, name: "Mocha", price: 4.5, image: "mocha_image.jpeg", description: "A sweet blend of coffee, chocolate, and steamed milk." },
  { id: 8, name: "Affogato", price: 4.8, image: "affogato_image.jpeg", description: "Espresso poured over creamy vanilla ice cream." },
  { id: 9, name: "Green tea", price: 4.0, image: "green_tea_image.jpeg", description: "Fresh and earthy green tea with calming properties." },
  { id: 10, name: "Black tea", price: 4.0, image: "black_tea_image.jpeg", description: "Bold and classic black tea, perfect any time of day." },
];


export default function OrderConfirmationPage() {
  const { id } = useParams();
  const item = items.find(i => i.id === Number(id));
  const navigate = useNavigate();
  const [cart, setCart] = useAtom(cartAtom);

  const confirmOrder = () => {
    if (item) {
      // Check if the item already exists in the cart
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      let updatedCart;

      if (existingItemIndex !== -1) {
        // If it exists, increment its quantity
        updatedCart = cart.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        );
      } else {
        // If it doesn't exist, add it with quantity 1
        updatedCart = [...cart, { ...item, quantity: 1 }];
      }

      // Update Jotai state and localStorage
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      navigate("/"); // Go back to landing page
    }
  };

  // to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  if (!item) return <p>Item not found</p>;

  return (
    <Layout>
      <FaArrowLeftIcon onClick={goBack} />
      <ConfirmationWrapper>
        <Content>
          <h4>Confirm Your Order</h4>
          <h2>{item.name} - ${item.price}</h2>
          <img src={`/images/${item.image}`} alt="" />
            <DescriptionText>
              {item.description}
            </DescriptionText>
        </Content>
        <ButtonWrapper>
          <Button onClick={confirmOrder} fullWidth>Confirm Order</Button>
        </ButtonWrapper>
      </ConfirmationWrapper>
      
    </Layout>
  );
}

// const FaArrowLeftIcon = styled(FaArrowLeft)`
//   cursor: pointer;
// `;

const ConfirmationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%; /* now it fills the available height */
  max-width: 500px;
  margin: 20px auto;
  padding: 16px;
  text-align: center;
`;

const Content = styled.div`
  h4 {
    margin-bottom: 10px;
  }

  h2 {
    margin: 20px 0;
  }

  img {
    max-width: 200px;
    margin: 20px auto;
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  // margin-top: auto; /* pushes button to bottom */
  // margin-bottom: 150px;
`;

const FaArrowLeftIcon = styled(FaArrowLeft)`
  cursor: pointer;
  margin: 16px;
  font-size: 24px;
`;

const DescriptionText = styled.p`
  font-size: 16px;
  color: #444;
  // background: #f9f9f9;
  // border: 1px solid #eee;
  // border-radius: 8px;
  padding: 12px;
  margin: 20px auto;
  max-width: 90%;
  font-style: italic;
`;