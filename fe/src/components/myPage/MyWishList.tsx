import styled from "styled-components";
import { MyRecipesContainer } from "./MyRecipes";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getCustomCards } from "../../utils/query";
import RecipePagination from "../card/RecipePagination";
import LoadingComponent from "../loading/LoadingComponent";
import Card from "../card/Card";

const WishListContainer = styled(MyRecipesContainer)``;

const ContentArea = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  place-items: center;
  padding: 80px 30px;
`;

export default function MyWishList() {
  const {
    data,
    pageInfo,
    isLoading,
    isPreviousData,
    hasMore,
    onNextClick,
    onPrevClick,
  } = useMainPagination("bookmark", getCustomCards);
  return (
    <WishListContainer>
      {isLoading && <LoadingComponent />}
      <ContentArea>
        {data?.map((recipe) => (
          <Card
            key={recipe.id}
            recipe={recipe}
            category={recipe.category?.split("_")[0].toLocaleLowerCase()}
          />
        ))}
      </ContentArea>
      {pageInfo && pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </WishListContainer>
  );
}
