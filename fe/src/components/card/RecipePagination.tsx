import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { PageInfo } from "../../utils/query";

const CardsPageNationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px;
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
        <GrPrevious onClick={onPrevClick} size={"1.1rem"} />
      </CardsPageNationButton>
      <CardsPageNationDisplay>{`${pageInfo.page} / ${pageInfo.totalPage}`}</CardsPageNationDisplay>
      <CardsPageNationButton disabled={isPreviousData || hasMore}>
        <GrNext onClick={onNextClick} size={"1.1rem"} />
      </CardsPageNationButton>
    </CardsPageNationContainer>
  );
}
