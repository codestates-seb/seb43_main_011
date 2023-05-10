import styled from "styled-components";
import loginImg from "../images/login.png";
import mainLogo from "../images/loginLogo.png";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/UserSlice";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-image: url(${loginImg});
  background-size: contain;
  background-position: left;
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
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
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
    background-color: #f6db42;
    > .kakao {
      color: #3e2323;
    }
  }
`;

const GoogleButton = styled(OauthButton)`
  > .color-google {
    display: none;
  }
  > .white-google {
    display: block;
  }
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #e9e9e9;
    > .white-google {
      display: none;
    }
    > .color-google {
      display: block;
    }
  }
`;
const Kakao = styled(RiKakaoTalkFill)`
  color: white;
`;

const ErrorMessage = styled.div`
  margin: 5px 5px 10px 5px;
  color: #ff3131;
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  // 이메일 유효성 검사
  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+(.[a-zA-Z]{2,}){1,2}$/.test(
      e.target.value,
    );
    if (!emailRegex) {
      setEmailError("올바른 이메일 주소를 입력해주세요.");
    } else {
      setEmailError("");
    }
  };

  // 비밀번호 유효성 검사
  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
      e.target.value,
    );
    if (!passwordRegex) {
      setPasswordError("올바른 비밀번호 형식을 입력해주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = () => {
    axios
      .get("http://localhost:8080/users", { params: { email, password } })
      .then(async (response) => {
        console.log(response.data);
        const result = await response.data.find((user: any) => {
          return user.email === email && user.password === password;
        });
        if (result) {
          console.log("로그인에 성공하였습니다.");
          dispatch(login(result));
        } else {
          setError("이메일 또는 비밀번호가 일치하지 않습니다.");
          console.log(error);
        }
      })
      .catch((error) => {
        setError("에러가 발생하였습니다.");
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };
  console.log(error);
  return (
    <Container>
      <ImageWrapper />
      <LoginWrapper>
        <InputLogo src={mainLogo} alt="Main logo" />
        <LoginForm onSubmit={(e) => handleSubmit(e)}>
          <OauthWrapper>
            <GoogleButton>
              <FaGoogle className="white-google" size="28" />
              <FcGoogle className="color-google" size="35" />
            </GoogleButton>
            <OauthButton>
              <Kakao className="kakao" size="30" />
            </OauthButton>
          </OauthWrapper>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleEmailValidation(e);
            }}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handlePasswordValidation(e);
            }}
            onBlur={handlePasswordValidation}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          <LoginButton type="submit">로그인</LoginButton>
          <SignupButton type="button">회원가입</SignupButton>
        </LoginForm>
      </LoginWrapper>
    </Container>
  );
}
