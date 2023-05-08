import styled from "styled-components";
import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Card from "./Card";

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
interface isTwo {
  isTwo: boolean;
}
const CardsRow = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(${(props: isTwo) => (props.isTwo ? 2 : 1)}, 1fr);
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
  list: number[];
  category: string;
}

export default function CardList({ list, category }: ListProps) {
  const [cardsPageNum, setCardsPageNum] = useState(1);

  const categoryText =
    category.length === 1
      ? `Level ${category}`
      : category === "regular"
      ? "정규 레시피"
      : "커스텀 레시피";

  const showCardLength = Number(category) < 2 ? 5 : 10; // cartegory가 "0", "1"일때만 5 그 외에 string일 경우 10
  const listStart = (cardsPageNum - 1) * showCardLength;
  const listEnd = listStart + showCardLength;
  const showList = list.slice(listStart, listEnd);

  const onPrevClick = () => {
    if (cardsPageNum > 1) setCardsPageNum((cardsPageNum) => cardsPageNum - 1);
  };
  const onNextClick = () => {
    if (cardsPageNum < Math.ceil(list.length / showCardLength))
      setCardsPageNum((cardsPageNum) => cardsPageNum + 1);
  };
  return (
    <CardsContainer>
      <CategoryBox>
        <div className="category">{categoryText}</div>
        <div className="center"></div>
        <div className="divider"></div>
      </CategoryBox>
      <CardsRow isTwo={Number(category) < 2 ? false : true}>
        {showList.map((_, i) => {
          return <Card key={i} />;
        })}
      </CardsRow>
      {list.length >= showCardLength && (
        <CardsPageNationContainer>
          <CardsPageNationButton>
            <GrPrevious onClick={onPrevClick} size={"1.1rem"} />
          </CardsPageNationButton>
          <CardsPageNationDisplay>{`${cardsPageNum} / ${Math.ceil(
            list.length / showCardLength,
          )}`}</CardsPageNationDisplay>
          <CardsPageNationButton>
            <GrNext onClick={onNextClick} size={"1.1rem"} />
          </CardsPageNationButton>
        </CardsPageNationContainer>
      )}
    </CardsContainer>
  );
}
