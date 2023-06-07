import styled from "styled-components";
import CardList from "../components/card/CardList";
import { Suspense, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CardListFallback from "../components/errorFallback/CardListFallback";
import { useQueryErrorResetBoundary } from "react-query";
import LoadingComponent from "../components/loading/LoadingComponent";
import { useMainPagination } from "../hooks/useMainPagination";
import { RegularResponseData, getCards } from "../utils/query";
import { ListProps } from "../components/card/CardList";

export const RecipesContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 80px auto 0;
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
  const { reset } = useQueryErrorResetBoundary();
  const alclholLevel = useMemo(() => {
    return ["0", "1", "10", "20", "30"];
  }, []);

  // 여기서 요청 5개를 동시에 보내고
  // 그거를 배열에 담아서 data1, data2, ...
  // map 돌리는 걸로 변경 totalData = [data1, data2, ...].map()
  // serverSideProps에서 totalData를 리턴
  interface FetchData {
    data: RegularResponseData | undefined;
    isPreviousData: boolean;
    hasMore: boolean | 0 | undefined;
    showCardLength: number | undefined;
    onNextClick: () => void;
    onPrevClick: () => void;
    boundary: string;
  }
  const totalData = [];
  for (const alcohol of alclholLevel) {
    const datas = useMainPagination(alcohol, getCards);
    const boundary = useMemo(() => {
      switch (alcohol) {
        case "0":
          return "무알콜";
        case "1":
          return "1 ~ 9도";
        case "30":
          return "30도 이상";
        default:
          return `${alcohol} ~ ${Number(alcohol) + 9}도`;
      }
    }, [alcohol]);
    const initialData = {
      ...datas,
      boundary,
    };
    totalData.push(initialData);
  }
  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {totalData.map((initialData, i) => {
          return (
            <ErrorBoundary
              key={i}
              FallbackComponent={CardListFallback}
              onReset={reset}
            >
              <Suspense key={`alcohol${i}`} fallback={<LoadingComponent />}>
                <CardList key={i} initialData={initialData} />
              </Suspense>
            </ErrorBoundary>
          );
        })}
      </RecipesContainer>
    </>
  );
}

export async function getServerSideProps() {
  const alclholLevel = ["0", "1", "10", "20", "30"];

  const totalData = [];
  for (const alcohol of alclholLevel) {
    const datas = useMainPagination(alcohol, getCards);
    const boundary = useMemo(() => {
      switch (alcohol) {
        case "0":
          return "무알콜";
        case "1":
          return "1 ~ 9도";
        case "30":
          return "30도 이상";
        default:
          return `${alcohol} ~ ${Number(alcohol) + 9}도`;
      }
    }, [alcohol]);
    const initialData = {
      ...datas,
      boundary,
    };
    totalData.push(initialData);
  }
  return totalData;
}
