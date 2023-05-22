import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import mascot from "./../../images/mascot.png";

const NotLoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GuideMessageTitle = styled.h1`
  margin-top: -10px;
  font-size: 2rem;
`;
const GuideMessageContent = styled.p`
  line-height: 5rem;
  font-size: 1.5rem;
`;
const ToLoginPage = styled.button`
  margin-top: 20px;
  border: none;
  background-color: #96a5ff;
  border-radius: 5px;
  padding: 8px;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #7386f7;
  }
`;

const MascotImg = styled.img`
  width: 400px;
  margin-top: -100px;
`;

export default function IsNotLogin() {
  const navigate = useNavigate();
  return (
    <NotLoginContainer>
      <MascotImg src={mascot} />
      <GuideMessageTitle>로그인이 필요한 서비스 입니다.</GuideMessageTitle>
      <GuideMessageContent>
        로그인 후 알딸딸에 나만의 레시피를 공유해 보세요
      </GuideMessageContent>
      <ToLoginPage onClick={() => navigate("/signin")}>
        로그인 페이지로 이동
      </ToLoginPage>
    </NotLoginContainer>
  );
}
