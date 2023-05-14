import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const GoogleSignup = () => {
  const handleGoogleLogin = () => {
    console.log("구글로그인 버튼클릭");
    //oauth구글로그인 처리
  };

  return (
    <>
      <GoogleSignupButton onClick={handleGoogleLogin}>
        <FcGoogle className="color-google" size="1.5rem" />
        구글 로그인
      </GoogleSignupButton>
    </>
  );
};

export default GoogleSignup;

const GoogleSignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16rem;
  height: 2.6rem;
  margin: 10px;
  border-radius: 2px;
  box-shadow: 1px 2px 2px 1px lightgray;
  border-style: none;
  background-color: white;
  font-weight: bold;
  gap: 0.5rem;
  font-size: 16px;
  color: #5d5c5c;
  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }
`;
