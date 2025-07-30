/** @jsxImportSource @emotion/react */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styled from "@emotion/styled";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import { Card } from "./Card";

const NavButton = styled.button<{ position: "left" | "right"; hidden?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ position }) => (position === "left" ? "left: -50px;" : "right: -50px;")}
  transform: translateY(-50%);
  background: #6B4F4F;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 10;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  pointer-events: ${({ hidden }) => (hidden ? "none" : "auto")};
  transition: opacity 0.4s ease, transform 0.2s ease;

 /* Hover effect for better UI */
  &:hover {
    transform: translateY(-50%) scale(1.1);
    background: #5a3f3f;
  }
`;

export const SaleSwiper = ({ items, onItemClick }: { items: any[]; onItemClick: (id: number) => void }) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  return (
    <SwiperWrapper>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        modules={[Navigation]}
        onSlideChange={(swiper) => {
          setIsAtStart(swiper.isBeginning);
          setIsAtEnd(swiper.isEnd);
        }}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              title={item.name}
              price={item.price}
              image={`/images/${item.image}`}
              onClick={() => onItemClick(item.id)}
              variant="swiper"
              isSale
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <NavButton className="custom-prev" position="left" hidden={isAtStart}>
        ‹
      </NavButton>
      <NavButton className="custom-next" position="right" hidden={isAtEnd}>
        ›
      </NavButton>
    </SwiperWrapper>
  );
};

const SwiperWrapper = styled.div`
  position: relative;
  width: 80%;
  margin: auto;
`;
