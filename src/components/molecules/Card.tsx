/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

interface CardProps {
  title: string;
  description?: string;
  price?: number;
  onClick?: () => void;
}

const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  padding: ${({ theme }) => theme.spacing(2)};
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover { transform: translateY(-4px); }
`;

const Title = styled.h3`margin-bottom: ${({ theme }) => theme.spacing(1)}; color: ${({ theme }) => theme.colors.primary};`;
const Price = styled.p`font-weight: bold; color: ${({ theme }) => theme.colors.accent};`;

export function Card({ title, description, price, onClick }: CardProps) {
  return (
    <CardWrapper onClick={onClick}>
      <Title>{title}</Title>
      {description && <p>{description}</p>}
      {price !== undefined && <Price>${price.toFixed(2)}</Price>}
    </CardWrapper>
  );
}
