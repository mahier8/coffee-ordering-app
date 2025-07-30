import { Layout } from "../components/organisms/Layout";
import { Card } from "../components/molecules/Card";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

const items = [
  { id: 1, name: "Espresso", price: 3.5 },
  { id: 2, name: "Latte", price: 4.0 },
  { id: 3, name: "Cappuccino", price: 4.2 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Our Coffee Menu</h1>
        <Swiper spaceBetween={20} slidesPerView={1} style={{ width: "80%", margin: "auto" }}>
          {items.map(item => (
            <SwiperSlide key={item.id}>
              <Card title={item.name} price={item.price} onClick={() => navigate(`/order/${item.id}`)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Layout>
  );
}
