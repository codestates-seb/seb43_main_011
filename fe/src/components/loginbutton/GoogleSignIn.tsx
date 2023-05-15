import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";

const GoogleSignIn = () => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if ("profileObj" in response) {
      // 성공적으로 로그인한 경우
      console.log("로그인 성공");
      console.log(response.profileObj);
      // 성공했을 때 수행할 작업을 여기에 추가하세요.
    } else {
      // 로그인 실패한 경우
      console.log("로그인 실패");
      console.log(response);
      // 실패했을 때 수행할 작업을 여기에 추가하세요.
    }
  };

  return (
    <>
      <Login
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="구글로 로그인"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default GoogleSignIn;

const Login = styled(GoogleLogin)`
  & > div > div > span {
    width: 10px;
    height: 10px;
  }
  width: 16rem;
  height: 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  margin: 5px;
  font-weight: bold;
`;
// const GoogleSignupButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 16rem;
//   height: 2.6rem;
//   margin: 10px;
//   border-radius: 2px;
//   box-shadow: 1px 2px 2px 1px lightgray;
//   border-style: none;
//   background-color: white;
//   font-weight: bold;
//   gap: 0.5rem;
//   font-size: 16px;
//   color: #5d5c5c;
//   &:hover {
//     cursor: pointer;
//     background-color: #f3f3f3;
//   }
// `;
