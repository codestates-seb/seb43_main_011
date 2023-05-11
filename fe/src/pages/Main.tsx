import styled from "styled-components";
import CardList from "../components/card/CardList";
import { useQuery } from "react-query";
import { Recipes, getCards } from "../utils/query";

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
  const path = "/regular";
  const { data } = useQuery<Recipes>(["cards", path], () => getCards(path));
  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {data &&
          Object.keys(data).map((key: string, i) => {
            return (
              <CardList list={data[key]} category={key.slice(-1)} key={i} />
            );
          })}
      </RecipesContainer>
    </>
  );
}
