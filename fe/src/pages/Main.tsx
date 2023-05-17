import styled from "styled-components";
import CardList from "../components/card/CardList";
import { useMemo } from "react";

export const RecipesContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 85px auto 0;
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
  const alclholLevel = useMemo(() => {
    return ["0", "10", "20", "30", "40"];
  }, []);
  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {alclholLevel.map((alcohol, i) => (
          <CardList path={alcohol} key={i} />
        ))}
      </RecipesContainer>
    </>
  );
}
