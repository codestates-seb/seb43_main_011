import styled from "styled-components";
import { useQuery } from "react-query";
import { tokenInstance } from "../../utils/tokeninstance";
import { useState } from "react";
import { MyInfoData } from "../../pages/Mypage";

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
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  if (isError) {
    return <p>에러가 발생하였습니다: {isError.toString()}</p>;
  }
  if (!data) {
    return null;
  }
  console.log(data);
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
          <Content>{data.description || "상태메세지를 넣어주세요."}</Content>
        </InputWrapper>
        <Button onClick={ToggleEditHandle}>Edit</Button>
      </InfoWrapper>
    </Container>
  );
}
