import styled from "@emotion/styled";

export const Spinner = () => {
  return (
    <SpinnerWrapper>
      <Loader />
    </SpinnerWrapper>
  );
};

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* full screen center */
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #6B4F4F; /* Coffee color (theme primary) */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
