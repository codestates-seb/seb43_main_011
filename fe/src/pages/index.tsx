import styled from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import CardListFallback from "../components/errorFallback/CardListFallback";
import { QUERY_KEY, ALCOHOL_LEVEL_LIST } from "../utils/queryKeys";
import CocktailListByAlcholLevel from "../components/main/CocktailListByAlcholLevel";

import {
  QueryClient,
  dehydrate,
  useQueryErrorResetBoundary,
} from "react-query";
import { getCards } from "../utils/query";

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

  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {ALCOHOL_LEVEL_LIST.map((level) => (
          <ErrorBoundary FallbackComponent={CardListFallback} onReset={reset}>
            <CocktailListByAlcholLevel level={level} />
          </ErrorBoundary>
        ))}
      </RecipesContainer>
    </>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const page = 1;

  await Promise.all(
    ALCOHOL_LEVEL_LIST.map((level) => {
      return queryClient.prefetchQuery(
        QUERY_KEY.getCardsByAlcoholLevelKey(level, page),
        async () => await getCards(level, page),
      );
    }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
