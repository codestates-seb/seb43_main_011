import styled from "styled-components";
import signup from "../images/signupImage3.jpg";
import logo from "../images/logo.png";

const Signup = () => {
  return (
    <Container>
      {/* <BlankFrom></BlankFrom> */}
      {/* 오른쪽으로 입력폼이 오려면 위의 주석 해제 */}
      <SignupForm>
        <Logo src={logo} alt="logo"></Logo>
        <Label>Nickname</Label>
        <InputArea></InputArea>
        <Label>E-mail</Label>
        <InputArea></InputArea>
        <Label>Password</Label>
        <InputArea></InputArea>
        <SignupButton>가입하기</SignupButton>
      </SignupForm>
    </Container>
  );
};

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

const InputArea = styled.input`
  width: 16rem;
  height: 2rem;
  margin: 10px;
  border-radius: 5px;
  border: 0.5px solid #96a5ff;
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

export default Signup;
