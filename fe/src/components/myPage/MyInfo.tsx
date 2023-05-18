import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1052px;
  height: 420px;
  background: #ffffff;
  box-shadow: 2px 2px 13px -1px rgba(93, 93, 93, 0.7);
  border-radius: 30px;
  padding: 100px;
`;

const MyPhoto = styled.div`
  margin: 0px 100px 50px 0px;
  width: 230px;
  height: 230px;
  background-color: #7b8ade;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 23px;
  font-weight: 800;
  margin: 10px;
  text-align: left;
`;

const Input = styled.div`
  padding: 5px;
  margin: 10px 50px 10px 0;

  border-radius: 5px;
  border: 1.5px solid #828282;
  font-size: 17px;
  width: 100%;
  height: 50px;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 3px 1px #abb7fc;
  }
`;

const Button = styled.button`
  width: 111px;
  height: 40px;
  background-color: #96a5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffff;
  font-weight: 800;
  font-size: 24px;
  border: none;
  cursor: pointer;
  margin: 28px;
  margin-left: auto;
`;

export default function MyInfo() {
  return (
    <Container>
      <MyPhoto>사진 넣는 곳</MyPhoto>
      <InfoWrapper>
        <Title>Nickname</Title>
        <Input placeholder="닉네임을 입력해주세요." />
        <Title>Status Message</Title>
        <Input placeholder="상태메세지를 입력해주세요." />
        <Button>Edit</Button>
      </InfoWrapper>
    </Container>
  );
}
