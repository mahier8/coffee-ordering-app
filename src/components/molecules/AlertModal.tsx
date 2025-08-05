import styled from "@emotion/styled";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function AlertModal({ isOpen, message, onClose }: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </ModalContent>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 300px;
  width: 90%;

  p {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
  }

  button {
    padding: 8px 16px;
    background: #0077ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #005fcc;
    }
  }
`;
