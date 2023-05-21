import styled from "styled-components";
import Card from "../card/Card";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getMyRecipe } from "../../utils/query";
import RecipePagination from "../card/RecipePagination";
import LoadingComponent from "../card/LoadingComponent";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GoGear, GoCheck } from "react-icons/go";

const MyRecipesContainer = styled.div`
  width: 1300px;
  background: #ffffff;
  box-shadow: 2px 2px 13px -1px rgba(93, 93, 93, 0.7);
  border-radius: 30px;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 20px 30px 0 0;
`;

const FormChangeButton = styled.button`
  font-size: 1.5rem;
  border-radius: 15%;
  padding: 4px;
  height: 2rem;
  width: 3rem;
  border: none;
  background-color: #9c9c9c;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #96a5ff;
  }
`;

const CardContainer = styled.div`
  padding: 50px 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  row-gap: 50px;
  place-items: center;
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  height: 16rem;
  width: 13rem;
`;

interface EditProps {
  isEdit: boolean;
}

const CardMover = styled.div<EditProps>`
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 15px;
  z-index: 1;
  position: absolute;
  left: ${({ isEdit }) => (isEdit ? "-5%" : "0")};
  transition: all 0.3s;
`;

const EditSpace = styled.div<EditProps>`
  position: absolute;
  width: 60px;
  transition: all 0.3s;
  height: 100%;
  border-radius: 0 15px 15px 0;
  background-color: #fafcff;
  border: 1px solid lightgray;
  z-index: 0;
  right: ${({ isEdit }) => (isEdit ? "-15%" : "0")};
  opacity: ${({ isEdit }) => (isEdit ? "1" : "0")};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
  padding: 10px 10px 0 0;
`;

const RecipeDelete = styled(IoMdClose)`
  font-size: 1.3rem;
  border-radius: 25%;
  color: #404040;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #96a5ff;
    color: white;
  }
`;
const RecipeEdit = styled(RiEdit2Line)`
  font-size: 1.3rem;
  border-radius: 25%;
  color: #636363;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #96a5ff;
    color: white;
  }
`;

export default function MyRecipes() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, isPreviousData, hasMore, onNextClick, onPrevClick } =
    useMainPagination("myRecipe", getMyRecipe);
  const recipeDeleteClick = () => {
    // 레시피 삭제하는 요청 보내고 데이터 새로 가져오기
  };
  return (
    <MyRecipesContainer>
      <ButtonArea>
        <FormChangeButton onClick={() => setIsEdit((isEdit) => !isEdit)}>
          {!isEdit && <GoGear />}
          {isEdit && <GoCheck />}
        </FormChangeButton>
      </ButtonArea>
      <CardContainer>
        {isLoading && <LoadingComponent />}
        {data?.data.map((recipe) => (
          <CardWrapper key={recipe.id}>
            <CardMover isEdit={isEdit}>
              <Card recipe={recipe} category="custom" />
            </CardMover>
            <EditSpace isEdit={isEdit}>
              <RecipeDelete />
              <RecipeEdit />
            </EditSpace>
          </CardWrapper>
        ))}
      </CardContainer>
      {data?.pageInfo && data.pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={data?.pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </MyRecipesContainer>
  );
}
