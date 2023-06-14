import styled from "styled-components";
import { RegularResponseData, getCards } from "../../utils/query";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../../utils/queryKeys";
import { Suspense, useState } from "react";
import RecipePagination from "../card/RecipePagination";
import Card from "../card/Card";
import CocktailLiustLoading from "../loading/CocktailListLoading";
import useMainRecipePagination from "../../hooks/useMainRecipePagination";

const CardsContainer = styled.div`
  width: 100%;
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

const CardsRow = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export default function CocktailListByAlcholLevel({
  level,
}: {
  level: string;
}) {
  const [page, setPage] = useState(1);

  const { data } = useQuery<RegularResponseData>(
    QUERY_KEY.getCardsByAlcoholLevelKey(level, page),
    async () => await getCards(level, page),
    {
      useErrorBoundary: true,
      retry: 0,
      keepPreviousData: true,
    },
  );
  if (data) {
    const { hasMore, onNextClick, onPrevClick } = useMainRecipePagination(
      data.pageInfo,
      setPage,
    );
    return (
      <CardsContainer>
        <CategoryBox>
          <div className="boundary">{getAlcholBoundary(level)}</div>
          <div className="slash"></div>
          <div className="divider"></div>
        </CategoryBox>
        <CardsRow>
          {data?.data.map((recipe, i) => {
            return (
              <Suspense fallback={<CocktailLiustLoading />}>
                <Card recipe={recipe} key={i} category="regular" />
              </Suspense>
            );
          })}
        </CardsRow>
        {data.pageInfo.totalPage > 1 && (
          <RecipePagination
            pageInfo={data.pageInfo}
            hasMore={hasMore}
            isPreviousData={data.pageInfo.totalPage > page}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        )}
      </CardsContainer>
    );
  } else {
    return null;
  }
}

function getAlcholBoundary(level: string) {
  switch (level) {
    case "0":
      return "무알콜";
    case "1":
      return "1 ~ 9도";
    case "30":
      return "30도 이상";
    default:
      return `${level} ~ ${Number(level) + 9}도`;
  }
}
