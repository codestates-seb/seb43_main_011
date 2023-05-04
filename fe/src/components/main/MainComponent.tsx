import styled from "styled-components";
import Card from "../card/Card";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const ItemArea = styled.div`
  height: 100%;
  width: 1444px;
  margin: 0 auto;
`;

const CardsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
`;

export default function MainComponent() {
  const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <Container>
      <ItemArea>
        <CardsRow>
          {data.map((i) => {
            return <Card key={i} />;
          })}
        </CardsRow>
      </ItemArea>
    </Container>
  );
}
