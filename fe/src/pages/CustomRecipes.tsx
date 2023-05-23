import styled from "styled-components";
import { RecipesContainer } from "./Main";
import { Link } from "react-router-dom";
import Card from "../components/card/Card";
import { getCustomCards } from "../utils/query";
import { useMainPagination } from "../hooks/useMainPagination";
import RecipePagination from "../components/card/RecipePagination";
import LoadingComponent from "../components/loading/LoadingComponent";
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
  const { data, isLoading, isPreviousData, hasMore, onNextClick, onPrevClick } =
    useMainPagination(path, getCustomCards);

  return (
    <RecipesContainer>
      <CustomGuide>
        <GuideText>커스텀 레시피</GuideText>
        <RegistrationLink to={"/registration"}>
          레시피 등록하기
        </RegistrationLink>
      </CustomGuide>
      <CardsRow>
        {isLoading && <LoadingComponent />}
        {data?.data.map((recipe) => {
          return <Card key={recipe.id} recipe={recipe} category="custom" />;
        })}
      </CardsRow>
      {data?.pageInfo && data.pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={data?.pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </RecipesContainer>
  );
}
