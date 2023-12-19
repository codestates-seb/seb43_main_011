import styled from "styled-components";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import React, { useState } from "react";
import { useMutation } from "react-query";
import ImageUpload from "../components/imageupload/ImageUpload";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import { tokenInstance } from "../utils/tokeninstance";
import IsNotLogin from "../components/errorFallback/IsNotLogin";
import { useDeleteRecipe } from "../hooks/useDeleteRecipe";

const CocktailRegistration = () => {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("UTK") !== null;
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeStep, setRecipeStep] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectLineId, setSelectLineId] = useState(-1);
  const [selectLines, setSelectLines] = useState([
    { id: 0, stuff: "", amount: "", selectOption: "ml" },
  ]);
  const [isNotOk, setIsNotOk] = useState({
    name: false,
    description: false,
    recipeStep: false,
  });
  const descriptionRegex = /[가-힣a-zA-Z0-9\s.()!]{3,}/;
  const nameRegex = /^[가-힣\s()]+$/;
  const recipeStepRegex = /^[ㄱ-ㅎ가-힣]*([a-zA-Z0-9\n() ,.!]*[ㄱ-ㅎ가-힣]*)*$/;
  const stuffRegex = /^[가-힣a-zA-Z\s]+$/;
  const amountRegex = /^\d+$/;
  interface NewRecipe {
    name: string;
    description: string;
    recipe: string;
    ingredient: string;
  }

  const postCustomRecipe = async (data: NewRecipe) => {
    const content = JSON.stringify(data);
    const response = await tokenInstance.post(
      "/custom/submit/content",
      content,
    );
    return response.data.data.recipeId;
  };

  interface NewImage {
    id: number;
    formData: FormData;
  }
  const postCustomImage = async (data: NewImage) => {
    const response = await tokenInstance.post(
      `/custom/submit/image/${data.id}`,
      data.formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  };

  const recipeMutation = useMutation(postCustomRecipe);
  const imageMutation = useMutation(postCustomImage);
  const deleteMutation = useDeleteRecipe();

  // 버튼효과
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // +버튼을 누르면 재료등록폼 추가
  const handleAddSelectLine = () => {
    //키가 겹치지 않도록 고유한키 부여
    const lastSelectLine = selectLines[selectLines.length - 1];
    const newId = lastSelectLine.id + 1;

    const newSelectLines = [
      ...selectLines,
      { id: newId, stuff: "", amount: "", selectOption: "ml" },
    ];
    setSelectLines(newSelectLines);
  };

  // X버튼을 누르면 재료등록리스트 삭제
  const handleDeleteSelectLine = (id: number) => {
    const isCurrentSelection = id === selectLineId; // 현재 선택된 항목인지 확인

    if (id > 0) {
      const newSelectLines = selectLines.filter((line) => line.id !== id);
      setSelectLines(newSelectLines);

      if (isCurrentSelection) {
        setSelectLineId(-1);
      }
    }
  };

  const handleSubmitData = async () => {
    const totalData = selectLines
      .map((line, i) => {
        if (!amountRegex.test(line.amount) || !stuffRegex.test(line.stuff)) {
          window.alert(`${i + 1}번째 재료가 잘못 입력되었습니다.`);
        } else {
          return line.stuff + line.amount + line.selectOption;
        }
      })
      .join("\n");
    const customRecipeCreateDto = {
      description: description,
      ingredient: totalData,
      name: name,
      recipe: recipeStep,
    };
    if (isNotOk.name) {
      window.alert("레시피 이름은 한글로만 작성 가능합니다.");
    } else if (isNotOk.description) {
      window.alert(
        "칵테일 소개는 최소 3글자 이상의 한줄로 작성해 주세요 특수문자는 !(). 만 가능합니다.",
      );
    } else if (isNotOk.recipeStep) {
      window.alert(
        "레시피 양식을 토대로 다시 작성해 주세요. (),.! 외의 특수문자는 허용하지 않습니다",
      );
    } else {
      recipeMutation.mutate(customRecipeCreateDto, {
        onSuccess: (data) => {
          const formData: FormData = new FormData();
          formData.append("image", selectedImage);
          const input = {
            id: data,
            formData: formData,
          };
          imageMutation.mutate(input, {
            onSuccess: () => {
              navigate("/custom");
            },
            onError: () => {
              window.alert("이미지 등록실패, 이미지의 크기가 너무 큽니다");
              deleteMutation.mutateAsync(data);
              setName("");
              setDescription("");
              setRecipeStep("");
              setSelectedImage(undefined);
              setSelectLineId(-1);
              setSelectLines([
                { id: 0, stuff: "", amount: "", selectOption: "ml" },
              ]);
            },
          });
        },
      });
    }
  };

  const handleImageUpload = (image: File) => {
    setSelectedImage(image);
  };
  return (
    <Container>
      {!isLogin && <IsNotLogin />}
      {isLogin && (
        <EditForm>
          <TopInfo>
            <ImageUpload
              onImageUpload={handleImageUpload}
              isEmpty={!selectedImage}
            />
            <TopCocktailSummary>
              <LabelName>이름을 알려주세요</LabelName>
              <InputName
                placeholder=" 롱 아일랜드 아이스티"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsNotOk((prevState) => ({
                    ...prevState,
                    name: !nameRegex.test(e.target.value),
                  }));
                }}
                isNotOk={isNotOk.name}
              />
              <LabelSummary>이 칵테일을 한줄로 표현해주세요</LabelSummary>
              <InputSummary
                placeholder=" 술기운이 오래가는 콜라, 레몬이 섞인 묘한 맛!"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsNotOk((prevState) => ({
                    ...prevState,
                    description: !descriptionRegex.test(e.target.value),
                  }));
                }}
                isNotOk={isNotOk.description}
              />
            </TopCocktailSummary>
          </TopInfo>

          <BottomInfo>
            <IngredientLabel>재료 목록</IngredientLabel>

            {selectLines.map((line) => (
              <React.Fragment key={line.id}>
                <SelectList>
                  <SelectLine>
                    <ListLabel>종류 :</ListLabel>
                    <InputType
                      placeholder=" 종류를 선택해주세요"
                      value={line.stuff}
                      onChange={(e) => {
                        const newSelectLines = selectLines.map((item) =>
                          item.id === line.id
                            ? { ...item, stuff: e.target.value }
                            : item,
                        );
                        setSelectLines(newSelectLines);
                      }}
                    />
                    <DeleteButton
                      onClick={() => handleDeleteSelectLine(line.id)}
                    />
                  </SelectLine>
                  <SelectLine>
                    <ListLabel>수량 :</ListLabel>
                    <InputAmount
                      placeholder=" 수량을 입력해주세요"
                      value={line.amount}
                      onChange={(e) => {
                        const newSelectLines = selectLines.map((item) =>
                          item.id === line.id
                            ? { ...item, amount: e.target.value }
                            : item,
                        );
                        setSelectLines(newSelectLines);
                      }}
                    />
                    <UnitSelector
                      value={line.selectOption}
                      onChange={(e) => {
                        const newSelectLines = selectLines.map((item) =>
                          item.id === line.id
                            ? { ...item, selectOption: e.target.value }
                            : item,
                        );
                        setSelectLines(newSelectLines);
                      }}
                    >
                      <option value="ml">ml</option>
                      <option value="개">개</option>
                      <option value="spoon">spoon</option>
                      <option value="drops">drops</option>
                      <option value="slice">slice</option>
                      <option value="leaves">leaves</option>
                      <option value="peel">peel</option>
                      <option value="dash">dash</option>
                      <option value="gram">gram</option>
                    </UnitSelector>
                  </SelectLine>
                </SelectList>
              </React.Fragment>
            ))}

            <DivisionLine>
              <IconContainer
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleAddSelectLine}
              >
                {isHovered ? <FillIcon /> : <OutIcon />}
              </IconContainer>
            </DivisionLine>

            <RecipeLabel>레시피를 단계별로 설명해 주세요</RecipeLabel>
            <RecipeStep
              placeholder="ex)
1.유리잔 테두리에 소금을 바른다.
2.얼음을 채운 셰이커에 데킬라 블랑코 50ml, 쿠앵트로(혹은 트리플 섹) 20ml을 붓는다.
3.라임 주스 15ml를 넣는다.
4.잘 흔들어 마가리타 잔에 따른다."
              value={recipeStep}
              onChange={(e) => {
                setRecipeStep(e.target.value);
                setIsNotOk((prevState) => ({
                  ...prevState,
                  recipeStep: !recipeStepRegex.test(e.target.value),
                }));
              }}
              isNotOk={isNotOk.recipeStep}
            />
          </BottomInfo>
          <SubmitButton type="submit" onClick={handleSubmitData}>
            SUBMIT
          </SubmitButton>
        </EditForm>
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
