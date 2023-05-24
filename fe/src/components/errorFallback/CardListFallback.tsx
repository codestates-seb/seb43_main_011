import styled from "styled-components";

const ErrorFallbackContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorDisplay = styled.div`
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ResetButton = styled.button`
  color: white;
  font-weight: bold;
  border: none;
  background-color: #96a5ff;
  padding: 5px;
  border-radius: 5px;
  margin: 10px auto;
`;

export default function CardListFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <ErrorFallbackContainer>
      <ErrorDisplay>
        <ErrorMessage>레시피 불러오기를 실패했습니다.</ErrorMessage>
        <p>잠시 후 다시 시도해 주세요</p>
      </ErrorDisplay>
      <ResetButton onClick={() => resetErrorBoundary()}>새로고침</ResetButton>
    </ErrorFallbackContainer>
  );
}
