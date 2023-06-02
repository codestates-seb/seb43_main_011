import styled from "styled-components";
import CardList from "../components/card/CardList";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CardListFallback from "../components/errorFallback/CardListFallback";
import { useQueryErrorResetBoundary } from "react-query";

export const RecipesContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 80px auto 0;
  position: relative;
  padding: 60px 0 20px;
`;

const GuideText = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

export default function Main() {
  const { reset } = useQueryErrorResetBoundary();
  const alclholLevel = useMemo(() => {
    return ["0", "1", "10", "20", "30"];
  }, []);
  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {alclholLevel.map((alcohol, i) => (
          <ErrorBoundary
            key={i}
            FallbackComponent={CardListFallback}
            onReset={reset}
          >
            <CardList path={alcohol} key={i} />
          </ErrorBoundary>
        ))}
      </RecipesContainer>
    </>
  );
}
