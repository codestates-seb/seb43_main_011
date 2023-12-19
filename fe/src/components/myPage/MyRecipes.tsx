import styled from "styled-components";
import Card from "../card/Card";
import { useMainPagination } from "../../hooks/useMainPagination";
import { getMyRecipe } from "../../utils/query";
import RecipePagination from "../card/RecipePagination";
import LoadingComponent from "../loading/LoadingComponent";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GoGear, GoCheck } from "react-icons/go";

export const MyRecipesContainer = styled.div`
  max-width: 1300px;
  width: 100%;
  background: #ffffff;
  box-shadow: 2px 2px 13px -1px rgba(93, 93, 93, 0.7);
  border-radius: 30px;
  @media screen and (max-width: 860px) {
    min-height: 100vh;
    height: 100%;
  }
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
  grid-template-rows: auto;
  gap: 50px;
  place-items: center;
  @media screen and (max-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 640px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  height: 16rem;
  width: 13rem;
  @media screen and (max-width: 640px) {
    width: 100%;
    height: 320px;
  }
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
  @media screen and (max-width: 640px) {
    left: ${({ isEdit }) => (isEdit ? "-3%" : "0")};
  }
`;

const DeleteChecked = styled.div`
  width: 100%;
  height: 83.5%;
  border-radius: 15px 15px 7px 7px;
  background-color: #b0b0b0;
  position: absolute;
  overflow: hidden;
  z-index: 1;
  > div {
    width: 20px;
    height: 100%;
    background-color: #dfdfdf;
    position: absolute;
    left: 45%;
    border-radius: 15px;
  }
  > .left {
    transform: rotate(45deg);
  }
  > .right {
    transform: rotate(-45deg);
  }
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
  @media screen and (max-width: 640px) {
    right: ${({ isEdit }) => (isEdit ? "-4%" : "0")};
    height: 100%;
  }
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
  const {
    data,
    pageInfo,
    isLoading,
    isPreviousData,
    hasMore,
    onNextClick,
    onPrevClick,
    deleteMyRecipe,
  } = useMainPagination("myRecipe", getMyRecipe);

  const [deleteQueue, setDeleteQueue] = useState<number[]>([]);
  const addToDeleteQueue = (id: number) => {
    if (deleteQueue?.includes(id)) {
      setDeleteQueue(deleteQueue.filter((hasId) => hasId !== id));
    } else {
      setDeleteQueue((queue) => queue && [...queue, id]);
    }
  };

  const recipeDeleteClick = async () => {
    if (deleteMyRecipe && deleteQueue) {
      await Promise.all(deleteQueue.map((id) => deleteMyRecipe(id)));
    }
  };

  const EditFormChange = async () => {
    if (deleteQueue && deleteQueue.length > 0) {
      recipeDeleteClick();
    }
    setDeleteQueue([]);
    setIsEdit((isEdit) => !isEdit);
  };

  return (
    <MyRecipesContainer>
      <ButtonArea>
        <FormChangeButton onClick={EditFormChange}>
          {!isEdit && <GoGear />}
          {isEdit && <GoCheck />}
        </FormChangeButton>
      </ButtonArea>
      <CardContainer>
        {isLoading && <LoadingComponent />}
        {data?.map((recipe) => (
          <CardWrapper key={recipe.id}>
            <CardMover isEdit={isEdit}>
              {deleteQueue.includes(recipe.id) && (
                <DeleteChecked>
                  <div className="left"></div>
                  <div className="right"></div>
                </DeleteChecked>
              )}
              <Card recipe={recipe} category="custom" />
            </CardMover>
            <EditSpace isEdit={isEdit}>
              <RecipeDelete onClick={() => addToDeleteQueue(recipe.id)} />
              <RecipeEdit
                onClick={() => navigate(`/custom/edit/${recipe.id}`)}
              />
            </EditSpace>
          </CardWrapper>
        ))}
      </CardContainer>
      {pageInfo && pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </MyRecipesContainer>
  );
}
