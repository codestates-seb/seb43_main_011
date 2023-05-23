import styled from "styled-components";
import signup from "../images/enter1.jpg";
import logo from "../images/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const Signup = () => {
  //이름 유효성검사
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLengthError, setShowLengthError] = useState(false); //길이오류
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    const hasSpecialChars = /^[a-zA-Z가-힣0-9]{2,12}$/.test(e.target.value);
    const lengthMatch = e.target.value.length < 2;

    setShowErrorMessage(!hasSpecialChars);
    setShowLengthError(lengthMatch);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex =
      /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/.test(e.target.value);
    setShowEmailError(!emailRegex);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#-]{6,24}$/.test(
        e.target.value,
      );
    setShowPasswordError(!passwordRegex);
  };

  interface UserData {
    nickName: string;
    email: string;
    password: string;
  }

  const postUserData = async (userData: UserData) => {
    const response = await axios.post("/signup", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  };

  const mutation = useMutation(postUserData);

  const handleSubmit = () => {
    const userData = {
      nickName: nickname,
      email: email,
      password: password,
    };

    mutation.mutate(userData, {
      onSuccess: () => {
        navigate("/signin");
      },
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container>
      <SignupForm>
        <Link to="/">
          <Logo src={logo} alt="logo"></Logo>
        </Link>
        <NicknameForm>
          <Label>Nickname</Label>
          <InputArea value={nickname} onChange={handleNickname}></InputArea>
          {showErrorMessage && (
            <ErrorMessage>닉네임에 특수문자는 사용할 수 없습니다.</ErrorMessage>
          )}
          {showLengthError && (
            <ErrorMessage>닉네임은 2자 이상만 가능합니다.</ErrorMessage>
          )}
        </NicknameForm>
        <EmailForm>
          <Label>E-mail</Label>
          <InputArea value={email} onChange={handleEmail}></InputArea>
          {showEmailError && (
            <ErrorMessage>올바른 이메일 형식을 입력해주세요.</ErrorMessage>
          )}
        </EmailForm>
        <PasswordForm>
          <Label>Password</Label>
          <InputContainer>
            <InputArea
              value={password}
              onChange={handlePassword}
              type={showPassword ? "password" : "text"}
            ></InputArea>
            <VisibilityIcon onClick={handleTogglePassword}>
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </VisibilityIcon>
          </InputContainer>

          {showPasswordError && (
            <ErrorMessage>
              최소 1개 이상의 숫자와 특수문자가 포함되어어 합니다.
            </ErrorMessage>
          )}
        </PasswordForm>

        <SignupButton onClick={handleSubmit}>가입하기</SignupButton>
      </SignupForm>
    </Container>
  );
};

export default Signup;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const VisibilityIcon = styled.div`
  position: absolute;
  color: #96a5ff;
  right: 10px;
  top: 62%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const InputArea = styled.input`
  width: 16rem;
  height: 2rem;
  padding: 7px;
  margin-top: 7px;
  border-radius: 5px;
  border: 0.5px solid #96a5ff;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;
  }
`;

const NicknameForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

// const BlankFrom = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 36rem;
//   width: 21rem;
// `;

const Label = styled.label`
  width: 16rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const SignupButton = styled.button`
  width: 16rem;
  height: 2.5rem;
  margin: 10px;
  border-radius: 5px;
  border-style: none;
  background-color: #96a5ff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #8265d6;
    color: #ffff;
  }
`;
