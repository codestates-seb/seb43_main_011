import { useState, ChangeEvent } from "react";
import { useMutation } from "react-query";
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

const Input = styled.input`
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
  const [nickname, setNickname] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const mutation = useMutation(
    (data: { nickname: string; statusMessage: string }) =>
      fetch("http://localhost:3000/member/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => response.json()),

    {
      onError: (error: Error) => {
        console.error("에러가 발생했습니다.", error);
      },
    },
  );

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleStatusMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      nickname: nickname,
      statusMessage: statusMessage,
    };

    mutation.mutate(data);
  };

  return (
    <Container>
      <MyPhoto>사진 넣는 곳</MyPhoto>
      <InfoWrapper>
        <Title>Nickname</Title>
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={handleNicknameChange}
        />
        <Title>Status Message</Title>
        <Input
          type="text"
          placeholder="상태메세지를 입력해주세요."
          value={statusMessage}
          onChange={handleStatusMessageChange}
        />
        <Button onClick={handleSubmit}>Edit</Button>
        {mutation.isLoading && <p>로딩중입니다...</p>}

        {mutation.isError && <p>에러 발생: {mutation.error.message}</p>}

        {mutation.isSuccess && (
          <p>Server response: {JSON.stringify(mutation.data)}</p>
        )}
      </InfoWrapper>
    </Container>
  );
}
