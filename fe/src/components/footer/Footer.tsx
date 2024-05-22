import styled from "styled-components";
import tippler from "../../images/tippler.png";

const Footer = () => {
  return (
    <Container>
      <ItemArea>
        <Info>
          <Description>made by tippler</Description>
          <Description>Copyright©2023 tippler all rights reserved.</Description>
        </Info>
        <Logo>
          <img src={tippler} alt="logo" />
        </Logo>
      </ItemArea>
    </Container>
  );
};

const Container = styled.div`
  height: 5rem;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 50px;
`;

const ItemArea = styled.div`
  max-width: 1360px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Description = styled.p`
  //폰트스타일넣기
  margin: 0.3em;
`;

const Info = styled.div`
  //폰트 스타일 임포트 하기전 확인용도
  font-size: 16px;
`;
const Logo = styled.div``;

export default Footer;
