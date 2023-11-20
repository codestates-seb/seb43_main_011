import styled from "styled-components";
import { useContext, useMemo } from "react";
import Card from "./Card";
import RecipePagination from "./RecipePagination";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getCards } from "../../utils/query";
import LoadingComponent from "../loading/LoadingComponent";
import { MobileViewContext } from "../../pages/Layout";

const CardsContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const CategoryBox = styled.div`
  width: 98%;
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
  @media screen and (max-width: 640px) {
    width: 94%;
    border-top: 2px solid #6f8892e8;
    padding-top: 20px;
    margin: 0 auto;
    > .boundary {
      flex-basis: 20%;
      border-top: none;
      border-radius: 15px;
      background-color: #8697f7;
      color: white;
    }
    > .divider {
      flex-basis: 80%;
      border-bottom: none;
      padding-top: 6px;
    }
    > .slash {
      background-color: inherit;
    }
  }
`;

export const CardsRow = styled.div`
  margin: 20px 0;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  grid-gap: 30px;
  place-items: center;
  @media screen and (max-width: 1029px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

interface ListProps {
  path: string;
}

export default function CardList({ path }: ListProps) {
  const {
    data,
    pageInfo,
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

  const isMobile = useContext(MobileViewContext);
  return (
    <CardsContainer>
      <CategoryBox>
        <div className="boundary">{`${boundary}`}</div>
        <div className="slash"></div>
        <div className="divider">
          {isMobile && pageInfo && pageInfo.totalPage > 1 && (
            <RecipePagination
              pageInfo={pageInfo}
              hasMore={hasMore}
              isPreviousData={isPreviousData}
              onNextClick={onNextClick}
              onPrevClick={onPrevClick}
            />
          )}
        </div>
      </CategoryBox>
      <CardsRow>
        {isLoading && <LoadingComponent />}
        {data?.[0] &&
          data.map((recipe, i) => {
            return <Card recipe={recipe} key={i} category="regular" />;
          })}
        {!isFetching && data?.[0] === undefined && (
          <div>레시피가 존재하지 않습니다</div>
        )}
      </CardsRow>
      {!isMobile && pageInfo && pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={pageInfo}
          hasMore={hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </CardsContainer>
  );
}
