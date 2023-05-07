import styled from "styled-components";
import { useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Card from "../card/Card";

const CardsContainer = styled.div`
  width: 100%;
  padding-bottom: 30px;
`;

const AlcoholLevelBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 10px 20px;
  > .level {
    flex-basis: 6%;
    border-top: 2px solid #6f8892e8;
    border-radius: 0 4px 0 0;
    padding: 3px 0 0 8px;
    margin: 8px 0 5px;
  }
  > .center {
    transform: rotate(0.39turn);
    translate: -5px 9px;
    height: 33.3px;
    border-left: 2px solid #6f8892e8;
    border-radius: 0 0 0 1px;
    flex-basis: 1%;
  }
  > .line {
    border-bottom: 2px solid #6f8892e8;
    border-radius: 0 0 0 0;
    flex-basis: 92.6%;
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
  level: string;
}

export default function CardList({ list, level }: ListProps) {
  const [cardsPageNum, setCardsPageNum] = useState(1);
  const showCardLength = Number(level) > 1 ? 10 : 5;
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
      <AlcoholLevelBox>
        <div className="level">Level {level}</div>
        <div className="center"></div>
        <div className="line"></div>
      </AlcoholLevelBox>
      <CardsRow isTwo={Number(level) > 1 ? true : false}>
        {showList.map((i) => {
          return <Card key={i} />;
        })}
      </CardsRow>
      {list.length !== showCardLength && (
        <CardsPageNationContainer>
          <CardsPageNationButton>
            <GrPrevious onClick={onPrevClick} />
          </CardsPageNationButton>
          <CardsPageNationDisplay>{`${cardsPageNum} / ${Math.ceil(
            list.length / showCardLength,
          )}`}</CardsPageNationDisplay>
          <CardsPageNationButton>
            <GrNext onClick={onNextClick} />
          </CardsPageNationButton>
        </CardsPageNationContainer>
      )}
    </CardsContainer>
  );
}
