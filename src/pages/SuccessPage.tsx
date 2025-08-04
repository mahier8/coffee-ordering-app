import { Layout } from "../components/organisms/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Button } from "../components/atoms/Button";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderSummary = location.state?.orderSummary || [];

  // Calculate total
  const total = orderSummary.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <Layout>
      <ReceiptWrapper>
        <h2>✅ Order Confirmed!</h2>
        <p>Thank you for your order. Here’s your receipt:</p>

        <Receipt>
          <ReceiptHeader>
            <span>CoffeeTime ☕</span>
            <small>{new Date().toLocaleString()}</small>
          </ReceiptHeader>
          <ReceiptItems>
            {orderSummary.map((item, index) => (
              <div key={index} className="item">
                <span>{item.name} x{item.quantity || 1}</span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
          </ReceiptItems>
          <ReceiptTotal>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </ReceiptTotal>
        </Receipt>

        <Button onClick={() => navigate("/")}>Back to Menu</Button>
      </ReceiptWrapper>
    </Layout>
  );
}

const ReceiptWrapper = styled.div`
  text-align: center;
  margin: 40px auto;
  max-width: 400px;
`;

const Receipt = styled.div`
  background: #fff;
  border: 1px dashed #ccc;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
  border-radius: 8px;
  font-family: monospace;
`;

const ReceiptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReceiptItems = styled.div`
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px dashed #eee;
  }
`;

const ReceiptTotal = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-weight: bold;
  font-size: 18px;
`;
