import styled from "styled-components";
import { MyInfoData } from "../../pages/Mypage";
import { useNavigate } from "react-router-dom";

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

const MyPhoto = styled.img`
  margin: 0px 50px 50px 0px;
  width: 280px;
  height: 280px;
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
  padding-left: 15px;
  text-align: left;
  color: #504f4f;
`;

const Content = styled.div`
  padding-left: 23px;
  margin: 10px 50px 10px 0;
  font-size: 20px;
  width: 450px;
  height: 50px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 5px;
  border-radius: 27px;
  box-shadow: 0px 0px 8px 0px #cacaca;
`;
interface ButtonProps {
  red?: boolean;
}
const Button = styled.button<ButtonProps>`
  width: 111px;
  height: 40px;
  background-color: ${({ red }) => (red ? "#fc9d9d" : "#96a5ff")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #fff;
  font-weight: 800;
  font-size: 24px;
  border: none;
  cursor: pointer;
  margin: 28px 10px 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  align-items: center;
`;

interface MyInterfaceInfo {
  data: MyInfoData | undefined;
  isLoading: boolean;
  isError: boolean;
  ToggleEditHandle: () => void;
}

export default function MyInfo({
  data,
  isLoading,
  isError,
  ToggleEditHandle,
}: MyInterfaceInfo) {
  const navigate = useNavigate();
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>에러가 발생하였습니다: {isError.toString()}</p>;
  }
  if (!data) {
    return null;
  }
  return (
    <Container>
      <MyPhoto src={data.imageUrl} />
      <InfoWrapper>
        <InputWrapper>
          <Title>Nickname</Title>
          <Content>{data.nickName}</Content>
        </InputWrapper>
        <InputWrapper>
          <Title>Status Message</Title>
          <Content>
            {data.description || "나의 상태 메세지를 추가 해주세요"}
          </Content>
        </InputWrapper>
        <ButtonRow>
          <Button
            onClick={() => {
              sessionStorage.removeItem("UTK");
              navigate("/");
            }}
            red={true}
          >
            LogOut
          </Button>
          <Button onClick={ToggleEditHandle}>Edit</Button>
        </ButtonRow>
      </InfoWrapper>
    </Container>
  );
}
