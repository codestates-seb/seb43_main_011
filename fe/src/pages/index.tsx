import styled from "styled-components";
import CardList from "../components/card/CardList";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CardListFallback from "../components/errorFallback/CardListFallback";

import {
  QueryClient,
  dehydrate,
  useQueries,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
} from "react-query";
import LoadingComponent from "../components/loading/LoadingComponent";
import { useMainPagination } from "../hooks/useMainPagination";
import { RegularResponseData, getCards } from "../utils/query";
import { ListProps } from "../components/card/CardList";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import axios, { AxiosResponse } from "axios";

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

interface FetchData {
  data: RegularResponseData | undefined;
  isPreviousData: boolean;
  hasMore: boolean | 0 | undefined;
  showCardLength: number;
  onNextClick: () => void;
  onPrevClick: () => void;
  alcohol: string;
  listSize: number;
  boundary: string;
}

export default function Main() {
  const { reset } = useQueryErrorResetBoundary();
  const alclholLevel = ["0", "1", "10", "20", "30"];
  const totalData = alclholLevel.map(
    (alcohol) =>
      useQuery<RegularResponseData>(
        [alcohol, "5"],
        async () => await getCards(alcohol, 5, 1),
      ),
    // {
    //     return {
    //       queryKey: [alcohol, "5"],
    //       queryFn: async () => await getCards(alcohol, 5, 1),
    //     };
    //   },
  );

  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        <ErrorBoundary FallbackComponent={CardListFallback} onReset={reset}>
          {totalData &&
            totalData.map((initialData, i) => {
              if (initialData.data) {
                const datas = {
                  data: initialData.data,
                  alcohol: alclholLevel[i],
                };
                return <CardList key={datas.alcohol} initialData={datas} />;
              }
            })}
        </ErrorBoundary>
      </RecipesContainer>
    </>
  );
}

export async function getStaticProps() {
  const alclholLevel = ["0", "1", "10", "20", "30"];
  const queryClient = new QueryClient();

  await Promise.all(
    alclholLevel.map((alcohol) => {
      return queryClient.prefetchQuery(
        [alcohol, 5],
        async () => await getCards(alcohol, 5, 1),
      );
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };

  // const queryClient = new QueryClient();

  // for (const alcohol of alclholLevel) {
  //   let page = 1;
  //   let listSize = 5;

  //   await queryClient.prefetchQuery<RegularResponseData>(
  //     [alcohol, listSize],
  //     () => getCards(alcohol, listSize, page),
  //   );

  //   const data = queryClient.getQueryData<RegularResponseData>([
  //     alcohol,
  //     listSize,
  //   ]);
  //   const maxPage = data?.pageInfo.totalPage;
  //   const hasMore = maxPage && maxPage > page;

  //   const onNextClick = () => {
  //     page += 1;
  //   };
  //   const onPrevClick = () => {
  //     page += 1;
  //   };
  //   let isPreviousData = false;
  //   let datas: FetchData;
  //   let boundary = "";

  //   switch (alcohol) {
  //     case "0":
  //       boundary = "무알콜";
  //       break;
  //     case "1":
  //       boundary = "1 ~ 9도";
  //       break;
  //     case "30":
  //       boundary = "30도 이상";
  //       break;
  //     default:
  //       boundary = `${alcohol} ~ ${Number(alcohol) + 9}도`;
  //       break;
  //   }
  //   if (data) {
  //     data?.pageInfo.totalPage > data?.pageInfo.page;
  //     datas = {
  //       data: data,
  //       isPreviousData,
  //       hasMore: hasMore,
  //       showCardLength: data?.pageInfo.size,
  //       onNextClick: onNextClick,
  //       onPrevClick: onPrevClick,
  //       alcohol,
  //       listSize,
  //       boundary,
  //     };
  //     totalData.push(datas);
  //   }
  // }

  // return {
  //   props: {
  //     totalData,
  //     dehydratedState: dehydrate(queryClient),
  //   },
  // };
}
