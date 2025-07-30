import { Layout } from "../components/organisms/Layout";
import { Card } from "../components/molecules/Card";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import "swiper/css";

const saleItems = [
  { id: 1, name: "Espresso (Sale)", price: 2.5, image: "espresso_image.jpeg" },
  { id: 2, name: "Latte (Sale)", price: 3.0, image: "latte_image.jpeg" },
  { id: 1, name: "Rooibos tea (Sale)", price: 2.2, image: "rooibos_tea_image.jpeg" },
  { id: 2, name: "Iced coffee (Sale)", price: 3.5, image: "iced_coffee_image.jpeg" },
];

const regularItems = [
  { id: 3, name: "Cappuccino", price: 4.2, image: "cappuccino_image.jpeg" },
  { id: 4, name: "Americano", price: 4.0, image: "americano_image.jpeg" },
  { id: 5, name: "Mocha", price: 4.5, image: "mocha_image.jpeg" },
  { id: 3, name: "Affogato", price: 4.8, image: "affogato_image.jpeg" },
  { id: 4, name: "Green tea", price: 4.0, image: "green_tea_image.jpeg" },
  { id: 5, name: "Black tea", price: 4.0, image: "black_tea_image.jpeg" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
  <Layout>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Our Coffee Menu</h1>

      {/* Swiper for Sale Items */}
      <Swiper spaceBetween={20} slidesPerView={2} style={{ width: "80%", margin: "auto" }}>
        {saleItems.map(item => (
          <SwiperSlide key={item.id}>
            <Card
              title={item.name}
              price={item.price}
              // image={`../../public/images/${item.image}`} 
              image={`/images/${item.image}`}  
              onClick={() => navigate(`/order/${item.id}`)}
              variant="swiper"
              isSale={true} 
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Vertical List for Regular Items */}
      <h2 style={{ textAlign: "center", margin: "30px 0 15px" }}>Regular Coffees</h2>
      <List>
        {regularItems.map(item => (
          <Card
            key={item.id}
            title={item.name}
            price={item.price}
            // image={`../../public/images/${item.image}`} 
            image={`/images/${item.image}`}  
            onClick={() => navigate(`/order/${item.id}`)}
            variant="list"
          />
        ))}
      </List>
    </motion.div>
  </Layout>
);
}

const List = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const ListItem = styled.div`
  background: #f8f8f8;
  padding: 15px 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #ececec;
  }
`;