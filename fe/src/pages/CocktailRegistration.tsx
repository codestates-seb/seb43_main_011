import styled from "styled-components";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { tokenInstance } from "../utils/tokeninstance";
import IsNotLogin from "../components/errorFallback/IsNotLogin";
import RecipeForm from "../components/recipeForm/RecipeForm";
import { ImageDto, RecipeDto } from "../components/recipeForm/RecipeFormConfig";

const CocktailRegistration = () => {
  const isLogin = sessionStorage.getItem("UTK") !== null;
  const postCustomRecipe = async (data: RecipeDto) => {
    const content = JSON.stringify(data);
    const response = await tokenInstance.post(
      "/custom/submit/content",
      content,
    );
    return response.data.data.recipeId;
  };

  const postCustomImage = async (data: ImageDto) => {
    const response = await tokenInstance.post(
      `/custom/submit/image/${data.id}`,
      data.formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  };

  return (
    <Container>
      {!isLogin && <IsNotLogin />}
      {isLogin && (
        <RecipeForm postRecipe={postCustomRecipe} postImage={postCustomImage} />
      )}
    </Container>
  );
};

export default CocktailRegistration;

interface IsNotOkProps {
  isNotOk?: boolean;
}

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EditForm = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const TopInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
  max-width: 800px;
  width: 100%;
  @media screen and (max-width: 640px) {
    padding: 0 10px;
  }
`;

export const TopCocktailSummary = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 10px;
`;

export const LabelName = styled.label`
  width: 16rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

export const InputName = styled.input<IsNotOkProps>`
  width: 100%;
  height: 2rem;
  padding: 5px;
  border-radius: 5px;
  border: 0.5px solid ${({ isNotOk }) => (isNotOk ? "red" : "gray")};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

export const LabelSummary = styled.label`
  width: 16rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

export const InputSummary = styled.input<IsNotOkProps>`
  width: 100%;
  height: 8rem;
  padding: 5px;
  border-radius: 5px;
  border: 0.5px solid ${({ isNotOk }) => (isNotOk ? "red" : "gray")};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

export const BottomInfo = styled.div`
  text-align: center;
  max-width: 50rem;
  width: 100%;
  @media screen and (max-width: 640px) {
    padding: 0 10px;
  }
`;

export const IngredientLabel = styled.div`
  max-width: 50rem;
  width: 100%;
  display: flex;
  margin: 10px;
  color: #828282;
  font-weight: 900;
`;

export const DeleteButton = styled(TiDelete)`
  font-size: 1.3rem;
  margin: 0;
  padding: 0;
  color: red;
  visibility: hidden;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
  @media screen and (max-width: 790px) {
    visibility: visible;
  }
`;

export const SelectList = styled.div`
  width: 100%;
  height: 6rem;
  margin-bottom: 20px;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  &:hover {
    ${DeleteButton} {
      visibility: visible;
    }
  }
`;

export const SelectLine = styled.div`
  max-width: 758px;
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

export const ListLabel = styled.label`
  margin-right: 2rem;
  font-weight: 900;
  color: #828282;
  width: 10%;
  @media screen and (max-width: 600px) {
    width: 13%;
  }
`;

export const InputType = styled.input`
  margin: 0;
  padding: 5px;
  max-width: 39.5rem;
  width: 80%;
  margin-right: 1rem;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
  @media screen and (max-width: 640px) {
    width: 75%;
  }
`;

export const InputAmount = styled.input`
  margin-right: 1rem;
  padding: 5px;
  max-width: 33.5rem;
  width: 80%;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
  @media screen and (max-width: 790px) {
    width: 65%;
  }
`;

export const UnitSelector = styled.select`
  margin: 0;
  padding: 0 0 0 5px;
  max-width: 5rem;
  width: 10%;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
`;

export const DivisionLine = styled.div`
  padding: 15px;
  width: 100%;
  max-width: 50rem;
  border-top: 1px solid gray;
`;

export const IconContainer = styled.div`
  display: inline-block;
`;

export const OutIcon = styled(AiOutlinePlus)`
  font-size: 2rem;
  color: #96a5ff;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
`;

export const FillIcon = styled(AiFillPlusCircle)`
  font-size: 2rem;
  color: #96a5ff;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
`;

export const RecipeLabel = styled.label`
  width: 50rem;
  color: #828282;
  font-weight: 900;
  display: flex;
  margin: 10px;
`;

export const RecipeStep = styled.textarea<IsNotOkProps>`
  max-width: 50rem;
  width: 100%;
  height: 8rem;
  border-radius: 5px;
  padding: 10px;
  border: 0.5px solid ${({ isNotOk }) => (isNotOk ? "red" : "gray")};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

export const SubmitButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  border-style: none;
  background-color: #96a5ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 60px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    cursor: pointer;
    background-color: #5d5d5d;
    color: #ffff;
  }
`;
