/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface CardProps {
  title: string;
  description?: string;
  price?: number;
  image?: string;
  onClick?: () => void;
  variant?: "swiper" | "list"; 
  isSale?: boolean; 
}

export function Card({ title, description, price, image, onClick, variant = "swiper", isSale = false }: CardProps) {
  return (
    <CardWrapper onClick={onClick} variant={variant} isSale={isSale}>
      {image && <Image src={image} alt={title} variant={variant} />}
      <Content>
        <Title>{title}</Title>
        {description && <p>{description}</p>}
        {price !== undefined && <Price>${price.toFixed(2)}</Price>}
      </Content>
    </CardWrapper>
  );
}

const CardWrapper = styled.div<{ variant: "swiper" | "list"; isSale?: boolean }>`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: ${({ variant }) => (variant === "swiper" ? "center" : "left")};
  cursor: pointer;
  display: flex;
  flex-direction: ${({ variant }) => (variant === "list" ? "row" : "column")};
  align-items: ${({ variant }) => (variant === "list" ? "center" : "stretch")};
  gap: ${({ theme }) => theme.spacing(2)};
  transition: transform 0.3s;
  &:hover { transform: translateY(-4px); }

  ${({ variant }) =>
  variant === "swiper" &&
  `
    @media (max-width: 390px) {
      height: 280px;
    }
  `}  

  /* Sale badge positioning */
  ${({ isSale }) =>
    isSale &&
    `
    &::before {
      content: "SALE";
      position: absolute;
      top: 12px;
      right: 12px;
      background: #e63946;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      z-index: 10;
    }
  `}
`;


const Image = styled.img<{ variant: "swiper" | "list" }>`
  width: ${({ variant }) => (variant === "swiper" ? "100%" : "80px")};
  height: ${({ variant }) => (variant === "swiper" ? "150px" : "80px")};
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.primary};
`;

const Price = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};
`;