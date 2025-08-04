/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper>
        {title && <Title>{title}</Title>}
        <Message>{message}</Message>
        <Buttons>
          <Button onClick={onCancel} variant="cancel">Cancel</Button>
          <Button onClick={onConfirm} variant="confirm">Confirm</Button>
        </Buttons>
      </ModalWrapper>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 12px;
`;

const Message = styled.p`
  margin-bottom: 24px;
  font-size: 16px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const Button = styled.button<{ variant?: "confirm" | "cancel" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${({ variant }) => (variant === "confirm" ? "#e63946" : "#ccc")};
  color: ${({ variant }) => (variant === "confirm" ? "white" : "black")};

  &:hover {
    opacity: 0.9;
  }
`;
