import styled from "styled-components";
import signup from "../images/enter3.jpg";
import logo from "../images/logo.png";
import { useState } from "react";
import GooogleSignInButton from "../components/loginbutton/GoogleSignIn";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

interface UserData {
  email: string;
  password: string;
}

const Signup = () => {
  //이메일(아이디) 유효성검사
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex =
      /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/.test(e.target.value);
    setShowEmailError(!emailRegex); //정규식에 일치하지않으면 출력.
  };
  //비밀번호 유효성검사
  const [password, setPassword] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        e.target.value,
      );
    setShowPasswordError(!passwordRegex);
  };
  const setLogin = async (data: UserData) => {
    const res = await axios
      .post("/login", JSON.stringify(data))
      .then((response) => {
        const token = response.headers["authorization"];
        if (token) {
          sessionStorage.setItem("UTK", token);
        }
        return response;
      });
    return res.headers;
  };

  const loginMutate = useMutation(setLogin);

  //눌렀을때 서버로 전송하는 함수
  const handlelogin = (/*보내는데이터 타입*/) => {
    //post 요청으로 데이터보내기 axios
    const loginInfo = {
      email: email,
      password: password,
    };
    loginMutate.mutate(loginInfo, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        navigate("/");
      },
      onError: () => {
        window.alert("이메일 혹은 비밀번호가 일치하지 않습니다");
        setEmail("");
        setPassword("");
      },
    });
  };

  const handlePasswordKeyup = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && email && password) {
      handlelogin();
    }
  };

  return (
    <Container>
      <SignupForm>
        <Link to="/">
          <Logo src={logo} alt="logo"></Logo>
        </Link>
        <EmailForm>
          <Label>E-mail</Label>
          <InputArea
            value={email}
            onChange={handleEmail}
            placeholder="아이디"
          ></InputArea>
          {showEmailError && (
            <ErrorMessage>올바른 이메일 형식을 입력해주세요.</ErrorMessage>
          )}
        </EmailForm>
        <PasswordForm>
          <Label>Password</Label>
          <InputArea
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePassword}
            onKeyUp={handlePasswordKeyup}
          ></InputArea>
          {showPasswordError && (
            <ErrorMessage>
              최소 1개 이상의 숫자와 특수문자가 포함되어어 합니다.
            </ErrorMessage>
          )}
        </PasswordForm>
        <GooogleSignInButton />
        <SignupButton onClick={handlelogin}>로그인</SignupButton>
        <NavSignup to={"/signup"}>회원가입</NavSignup>
      </SignupForm>
    </Container>
  );
};

export default Signup;

const NavSignup = styled(Link)`
  font-size: 14px;
  margin-top: 10px;
  align-self: center;
  text-underline-offset: 3px;
`;

const InputArea = styled.input`
  width: 16rem;
  height: 2.4rem;
  padding: 7px;
  margin-top: 5px;
  border-radius: 5px;
  border: 0.5px solid #96a5ff;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;
  }
`;

const EmailForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PasswordForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 0px;
  padding: 0;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url(${signup});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Logo = styled.img`
  margin: 0;
  padding: 0;
`;

const SignupForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32rem;
  width: 21rem;
  border-radius: 15px;
  background-color: white;
  flex-direction: column;
`;

const Label = styled.label`
  width: 16rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const SignupButton = styled.button`
  width: 16rem;
  height: 2.6rem;
  margin: 10px;
  border-radius: 2px;
  box-shadow: 1px 2px 2px 1px lightgray;
  border-style: none;
  background-color: #96a5ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #8265d6;
    color: #ffff;
  }
`;

// const BlankFrom = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 36rem;
//   width: 21rem;
// `;
