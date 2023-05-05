import styled from "styled-components";
import cocktail from "../../images/cocktail.png";

const Card = () => {
  return (
    <Container>
      <Image />
      <Menuname>미도리샤워</Menuname>
    </Container>
  );
};

const Container = styled.div`
  height: 16rem;
  width: 13rem;

  border: 1px solid lightgray;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  margin: 30px; // 구분선임 추후 삭제
`;

const Image = styled.div`
  flex: 5;
  width: 13rem;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-image: url(${cocktail});
  background-size: cover;
  background-position: center;
  border-radius: 15px 15px 0 0; // 수정된 부분
`;

const Menuname = styled.div`
  flex: 1;
  width: 10rem;
  display: flex;
  align-items: center;
`;

export default Card;
