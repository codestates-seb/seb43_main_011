import styled from "styled-components";
import { RecipesContainer } from "./Main";
import { Link } from "react-router-dom";
import Card from "../components/card/Card";
import { useQuery } from "react-query";
import { getCustomCards, CustomResponseData } from "../utils/query";

const CustomGuide = styled.div`
  display: flex;
`;

const RegistrationLink = styled(Link)`
  text-decoration-line: none;
  color: white;
  background-color: #96a5ff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 5px 3px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #5469de;
  }
`;

const GuideText = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CardsRow = styled.div`
  margin: 20px 0;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export default function CustomRecipes() {
  const path = "custom";
  const { data, isError } = useQuery<CustomResponseData>(["custom", path], () =>
    getCustomCards(path),
  );
  if (isError) {
    return <h2>error boundary 쓰고 싶은데.. query reset도 해보고 싶은디..</h2>;
  }
  return (
    <RecipesContainer>
      <CustomGuide>
        <GuideText>커스텀 레시피</GuideText>
        <RegistrationLink to={"/upload"}>레시피 등록하기</RegistrationLink>
      </CustomGuide>
      <CardsRow>
        {data?.customRecipeResponseDtoList.map((recipe, i) => {
          return (
            <Card
              key={i}
              name={recipe.name}
              image={recipe.imageUrl}
              description={recipe.description}
              id={recipe.id}
            />
          );
        })}
      </CardsRow>
    </RecipesContainer>
  );
}
