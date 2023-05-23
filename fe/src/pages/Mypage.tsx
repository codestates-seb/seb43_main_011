import styled from "styled-components";
import MenuBar from "../components/myPage/MenuBar";
import EditMyInfo from "../components/myPage/EditMyInfo";
import MyInfo from "../components/myPage/MyInfo";
// import MyRecipes from "../components/myPage/myRecipe";
import { useState } from "react";
import { useQuery } from "react-query";
import { tokenInstance } from "../utils/tokeninstance";
import MyRecipes from "../components/myPage/MyRecipes";
import IsNotLogin from "../components/errorFallback/IsNotLogin";
import MyWishList from "../components/myPage/MyWishList";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
  min-height: 100vh;
  width: 100%;
`;

export interface MyInfoData {
  nickName: string;
  description: string;
  imageUrl: string;
}

export default function Mypage() {
  const [page, setPage] = useState("myInfo");
  const [isUserEdit, setIsUserEdit] = useState(false);
  const ToggleMyInfo = () => {
    setIsUserEdit((edit) => !edit);
  };

  const { data, isLoading, isError } = useQuery<MyInfoData>(
    "userInfo",
    fetchUserInfo,
  );
  async function fetchUserInfo() {
    const response = await tokenInstance.get("/member/myPage");

    return response.data.data;
  }

  return (
    <Container>
      {!data && <IsNotLogin />}
      <MenuBar page={page} setPage={setPage} />
      {page === "myInfo" && (
        <>
          {!isUserEdit && (
            <MyInfo
              data={data}
              isLoading={isLoading}
              isError={isError}
              ToggleEditHandle={ToggleMyInfo}
            />
          )}
          {isUserEdit && (
            <EditMyInfo infoData={data} ToggleEditHandle={ToggleMyInfo} />
          )}
        </>
      )}
      {page === "wishList" && <MyWishList />}
      {page === "myRecipe" && <MyRecipes />}
    </Container>
  );
}
