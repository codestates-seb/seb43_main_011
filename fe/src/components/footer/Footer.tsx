import styled from "styled-components";
import tippler from "../../images/tippler.png";

const Footer = () => {
  return (
    <Container>
      <Info>
        <Description>Company Tipple</Description>
        <Description>
          ADDRESS 서울특별시 서초구 서초대로 396, 강남빌딩 20층 (스파크플러스
          강남2호점)
        </Description>
        <Description>Copyright by Tippler 2023 All rights reserved</Description>
      </Info>
      <Logo>
        <img src={tippler} alt="logo" />
      </Logo>
    </Container>
  );
};

const Container = styled.div`
  height: 7.5rem;
  width: 100%;
  border: 1px solid lightgray;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
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
