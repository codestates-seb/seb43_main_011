import styled from "styled-components";
import { MyRecipesContainer } from "./MyRecipes";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getCustomCards } from "../../utils/query";
import RecipePagination from "../card/RecipePagination";
import LoadingComponent from "../card/LoadingComponent";
import Card from "../card/Card";

const WishListContainer = styled(MyRecipesContainer)``;

const ContentAeaa = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

export default function MyWishList() {
  const { data, isLoading, isPreviousData, hasMore, onNextClick, onPrevClick } =
    useMainPagination("bookmark", getCustomCards);
  console.log(data);
  return (
    <WishListContainer>
      {isLoading && <LoadingComponent />}
      <ContentAeaa>
        {data?.data.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} category={"몰루?"} />
        ))}
      </ContentAeaa>
      {data?.pageInfo && data.pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={data?.pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </WishListContainer>
  );
}
