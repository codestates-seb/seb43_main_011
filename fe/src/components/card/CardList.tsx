import { GetServerSideProps, GetServerSidePropsContext } from "next";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import RecipePagination from "./RecipePagination";
import { useMainPagination } from "../../hooks/useMainPagination";
import { RegularResponseData, getCards } from "../../utils/query";
import LoadingComponent from "../loading/LoadingComponent";

import store from "../../redux/store";
import { wrapper } from "../../redux/store";
import { ParsedUrlQuery } from "querystring";
import { useQueryClient } from "react-query";

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

interface RowInterface {
  isTwo: boolean;
  isSearch?: boolean;
}
const CardsRow = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export interface ListProps {
  initialData: {
    data: RegularResponseData | undefined;
    alcohol: string;
  };
}

export default function CardList({ initialData }: ListProps) {
  const { data, alcohol } = initialData;
  const [page, setPage] = useState(1);
  const [boundary, setBoundary] = useState("");
  useEffect(() => {
    switch (alcohol) {
      case "0":
        setBoundary("무알콜");
        break;
      case "1":
        setBoundary("1 ~ 9도");
        break;
      case "30":
        setBoundary("30도 이상");
        break;
      default:
        setBoundary(`${alcohol} ~ ${Number(alcohol) + 9}도`);
        break;
    }
  }, [alcohol]);

  const queryClient = useQueryClient();

  useEffect(() => {
    getCards(alcohol, 5, page).then((responseData) => {
      queryClient.setQueryData([alcohol, "5"], responseData);
    });
  }, [page, alcohol, queryClient]);

  if (data) {
    const hasMore = data.pageInfo.totalPage > page;

    const onNextClick = () => {
      setPage((page) => (hasMore ? page + 1 : page));
    };
    const onPrevClick = () => {
      setPage((page) => Math.max(page - 1, 1));
    };
    return (
      <CardsContainer>
        <CategoryBox>
          <div className="boundary">{boundary}</div>
          <div className="slash"></div>
          <div className="divider"></div>
        </CategoryBox>
        <CardsRow>
          {data.data.map((recipe, i) => {
            return <Card recipe={recipe} key={i} category="regular" />;
          })}
        </CardsRow>
        <RecipePagination
          pageInfo={data.pageInfo}
          hasMore={hasMore}
          isPreviousData={data.pageInfo.totalPage > page}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      </CardsContainer>
    );
  } else {
    return null;
  }
}
