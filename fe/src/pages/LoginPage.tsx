import styled from "styled-components";
import loginImg from "../images/login.png";
import mainLogo from "../images/loginLogo.png";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-image: url(${loginImg});
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
`;

const ImageWrapper = styled.div`
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
`;

const LoginWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 40px 0px 0px 40px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

const InputLogo = styled.img`
  width: 500px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1.5px solid #96a5ff;
  font-size: 17px;
  width: 100%;
  height: 55px;
`;

const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #96a5ff;
  color: #ffffff;
  width: 100%;
  margin-bottom: 15px;
  height: 50px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
`;
const SignupButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #96a5ff;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
  border: 1.37931px solid #999999;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
`;

const OauthWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
`;

const OauthButton = styled.button`
  width: 70px;
  height: 70px;
  font-size: 25px;
  background-color: #bdbaba;
  color: #ffffff;
  border-radius: 100%;
  border: none;
  margin: 20px;
  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffffff;
  }
`;

export default function LoginPage() {
  return (
    <Container>
      <ImageWrapper />
      <LoginWrapper>
        <InputLogo src={mainLogo} alt="Main logo" />
        <LoginForm>
          <OauthWrapper>
            <OauthButton>
              <FaGoogle size="28" />
            </OauthButton>
            <OauthButton>
              <RiKakaoTalkFill size="33" />
            </OauthButton>
          </OauthWrapper>
          <Input type="text" placeholder="이메일" />
          <Input type="password" placeholder="비밀번호" />
          <LoginButton>로그인</LoginButton>
          <SignupButton>회원가입</SignupButton>
        </LoginForm>
      </LoginWrapper>
    </Container>
  );
}
