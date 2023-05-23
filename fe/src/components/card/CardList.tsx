import styled from "styled-components";
import { useMemo } from "react";
import Card from "./Card";
import RecipePagination from "./RecipePagination";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getCards } from "../../utils/query";
import LoadingComponent from "../loading/LoadingComponent";

const CardsContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;

const CategoryBox = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 10px 20px;
  > .boundary {
    border-top: 2px solid #6f8892e8;
    text-align: center;
    padding: 5px;
    margin-top: 4px;
    flex-basis: 15%;
  }
  > .slash {
    transform: rotate(-45deg);
    margin: 0 10.5px 0 10.5px;
    width: 2px;
    background-color: #6f8892e8;
  }
  > .divider {
    border-bottom: 2px solid #6f8892e8;
    border-radius: 0 0 0 0;
    flex-basis: 90%;
    margin-bottom: 4px;
  }
`;

interface RowInterface {
  isTwo: boolean;
  isSearch?: boolean;
}
const CardsRow = styled.div<RowInterface>`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(
    ${(props: RowInterface) => (props.isTwo ? 2 : 1)},
    1fr
  );
  grid-gap: 30px;
  place-items: center;
`;

interface ListProps {
  path: string;
}

export default function CardList({ path }: ListProps) {
  const {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    hasMore,
    showCardLength,
    onNextClick,
    onPrevClick,
  } = useMainPagination(path, getCards);

  const boundary = useMemo(() => {
    switch (path) {
      case "0":
        return "무알콜";
      case "1":
        return "1 ~ 9도";
      case "30":
        return "30도 이상";
      default:
        return `${path} ~ ${Number(path) + 9}도`;
    }
  }, [path]);

  return (
    <CardsContainer>
      <CategoryBox>
        <div className="boundary">{`${boundary}`}</div>
        <div className="slash"></div>
        <div className="divider"></div>
      </CategoryBox>
      <CardsRow isTwo={showCardLength === 5 ? false : true}>
        {isLoading && <LoadingComponent />}
        {data?.data?.[0] &&
          data?.data.map((recipe, i) => {
            return <Card recipe={recipe} key={i} category="regular" />;
          })}
        {!isFetching && data?.data?.[0] === undefined && (
          <div>레시피가 존재하지 않습니다</div>
        )}
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
    </CardsContainer>
  );
}
