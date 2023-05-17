import styled from "styled-components";
import { useState, useMemo, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Card from "./Card";
import { getCards, RegularResponseData } from "../../utils/query";
import { useQuery, useQueryClient } from "react-query";

const CardsContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;

const CategoryBox = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 10px 20px;
  > .category {
    border-top: 2px solid #6f8892e8;
    text-align: center;
    padding: 5px;
    margin-top: 4px;
    flex-basis: 10%;
  }
  > .center {
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

const CardsPageNationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardsPageNationDisplay = styled.div`
  font-size: 1.1rem;
`;

const CardsPageNationButton = styled.button`
  border: none;
  background-color: white;
  margin: 0 15px;
`;

interface ListProps {
  path: string;
}

export default function CardList({ path }: ListProps) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const size = useMemo(() => {
    switch (path) {
      case "10":
        return 5;
      case "20":
        return 10;
      case "30":
        return 10;
      case "40":
        return 10;
      default:
        return 5;
    }
  }, [path]);

  const { data, status, isPreviousData } = useQuery<RegularResponseData>(
    [`${path}`, page, size],
    () => getCards(path, size, page),
    {
      staleTime: 2000,
      keepPreviousData: true,
    },
  );

  const maxPage = data?.pageInfo && data?.pageInfo.totalPage;
  const hasMore = maxPage && maxPage > page;
  useEffect(() => {
    if (!isPreviousData && !!hasMore) {
      queryClient.prefetchQuery({
        queryKey: [`${path}`, page + 1, size],
        queryFn: () => getCards(path, page + 1, size),
      });
    }
  }, [page, isPreviousData, queryClient, data]);
  const category = `Level ${path}`;

  const showCardLength = data?.pageInfo?.size;

  if (status === "error") {
    return <h2>error boundary 쓰고 싶은데.. query reset도 해보고 싶은디..</h2>;
  }
  return (
    <CardsContainer>
      <CategoryBox>
        <div className="category">{category}</div>
        <div className="center"></div>
        <div className="divider"></div>
      </CategoryBox>
      <CardsRow isTwo={showCardLength === 5 ? false : true}>
        {data?.data?.[0] &&
          data?.data.map((recipe, i) => {
            return (
              <Card
                name={recipe.name}
                image={recipe.imageUrl}
                description={recipe.description}
                id={recipe.id}
                key={i}
              />
            );
          })}
        {data?.data?.[0] === undefined && <div>레시피가 존재하지 않습니다</div>}
      </CardsRow>
      {
        <CardsPageNationContainer>
          <CardsPageNationButton disabled={page === 1}>
            <GrPrevious
              onClick={() => setPage((page) => Math.max(page - 1, 1))}
              size={"1.1rem"}
            />
          </CardsPageNationButton>
          <CardsPageNationDisplay>{`${data?.pageInfo.page} / ${data?.pageInfo.totalPage}`}</CardsPageNationDisplay>
          <CardsPageNationButton disabled={isPreviousData || !!hasMore}>
            <GrNext
              onClick={() => setPage((page) => (hasMore ? page + 1 : page))}
              size={"1.1rem"}
            />
          </CardsPageNationButton>
        </CardsPageNationContainer>
      }
    </CardsContainer>
  );
}
