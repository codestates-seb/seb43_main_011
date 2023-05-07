import styled from "styled-components";
import loginImg from "../../images/login1.png";
import mainLogo from "../../images/logo.png";
import whiteLogo from "../../images/logo-whigte.png";
import { RiKakaoTalkFill, RiUser3Line, RiLock2Line } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-image: url(${loginImg});
  background-size: contain;
  background-position: left;
`;

const ImageWrapper = styled.div`
  flex: 0.6;
  background-size: cover;
`;

const ImgLogo = styled.img`
  position: absolute;
  width: 422px;
  height: 266px;
  left: 60px;
  top: 300px;
  opacity: 0.65;
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
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1.5px solid #96a5ff;
  font-size: 15px;
  width: 100%;
  height: 60px;
`;

const LoginButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #96a5ff;
  color: #ffffff;
  width: 100%;
  margin-bottom: 10px;
  height: 50px;
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
    color: #ffff;
  }
`;

export default function LoginPage() {
  return (
    <Container>
      <ImageWrapper>
        <ImgLogo src={whiteLogo} />
      </ImageWrapper>
      <LoginWrapper>
        <InputLogo src={mainLogo} alt="Main logo" />
        <LoginForm>
          <OauthWrapper>
            <OauthButton>
              <FaGoogle />
            </OauthButton>
            <OauthButton>
              <RiKakaoTalkFill />
            </OauthButton>
          </OauthWrapper>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <LoginButton>로그인</LoginButton>
          <SignupButton>회원가입</SignupButton>
        </LoginForm>
      </LoginWrapper>
    </Container>
  );
}
