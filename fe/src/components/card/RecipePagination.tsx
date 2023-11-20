import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { PageInfo } from "../../utils/query";

const CardsPageNationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px;
  @media screen and (max-width: 640px) {
    margin: 0;
  }
`;

const CardsPageNationDisplay = styled.div`
  font-size: 1.1rem;
`;

const CardsPageNationButton = styled.button`
  border: none;
  background-color: white;
  margin: 0 15px;
  border-radius: 50%;
  color: #404040;
  font-size: 1.1rem;
  &:hover {
    cursor: pointer;
  }
`;

interface RecipePaginationProps {
  pageInfo: PageInfo;
  onNextClick: () => void;
  onPrevClick: () => void;
  hasMore: boolean;
  isPreviousData: boolean;
}

export default function RecipePagination({
  pageInfo,
  hasMore,
  isPreviousData,
  onNextClick,
  onPrevClick,
}: RecipePaginationProps) {
  return (
    <CardsPageNationContainer>
      <CardsPageNationButton disabled={pageInfo.page === 1}>
        <GrPrevious onClick={onPrevClick} />
      </CardsPageNationButton>
      <CardsPageNationDisplay>{`${pageInfo.page} / ${pageInfo.totalPage}`}</CardsPageNationDisplay>
      <CardsPageNationButton disabled={isPreviousData || !hasMore}>
        <GrNext onClick={onNextClick} />
      </CardsPageNationButton>
    </CardsPageNationContainer>
  );
}
