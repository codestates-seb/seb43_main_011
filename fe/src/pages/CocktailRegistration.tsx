import styled from "styled-components";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import React, { useState } from "react";
import { useMutation } from "react-query";
import ImageUpload from "../components/imageupload/ImageUpload";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import { tokenInstance } from "../utils/tokeninstance";

const CocktailRegistration = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [recipeStep, setRecipeStep] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectLineId, setSelectLineId] = useState<number>(-1);
  const [selectLines, setSelectLines] = useState([
    { id: 0, stuff: "", amount: "", selectOption: "ml" },
  ]);

  interface NewRecipe {
    name: string;
    description: string;
    recipe: string;
    ingredient: string;
  }

  const postCustomRecipe = async (data: NewRecipe) => {
    const content = JSON.stringify(data);
    try {
      const response = await tokenInstance.post(
        "/custom/submit/content",
        content,
      );
      console.log(response);
      return response.data.data.recipeId;
    } catch (error) {
      console.error(error);
    }
  };

  interface NewImage {
    id: number;
    formData: FormData;
  }
  const postCustomImage = async (data: NewImage) => {
    try {
      const response = await tokenInstance.post(
        `/custom/submit/image/${data.id}`,
        data.formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const recipeMutation = useMutation(postCustomRecipe);
  const imageMutation = useMutation(postCustomImage);

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

    const newSelectLines = selectLines.filter((line) => line.id !== id);
    setSelectLines(newSelectLines);

    if (isCurrentSelection) {
      setSelectLineId(-1);
    }
  };
  const handleSubmitData = async () => {
    const totalData = selectLines
      .map((line) => {
        return line.stuff + line.amount + line.selectOption;
      })
      .join("\n");

    const customRecipeCreateDto = {
      name: name,
      description: description,
      recipe: recipeStep,
      ingredient: totalData,
    };

    recipeMutation.mutate(customRecipeCreateDto, {
      onSuccess: (data) => {
        const formData: FormData = new FormData();
        formData.append("image", selectedImage);
        const input = {
          id: data,
          formData: formData,
        };
        imageMutation.mutate(input, {
          onSuccess: (data) => {
            console.log(data);
            navigate("/custom");
          },
        });
      },
    });
  };

  const handleImageUpload = (image: File) => {
    setSelectedImage(image);
  };

  return (
    <Container>
      <EditForm>
        <TopInfo>
          <ImageUpload onImageUpload={handleImageUpload} />
          <TopCocktailSummary>
            <LabelName>이름을 알려주세요</LabelName>
            <InputName
              placeholder=" 롱 아일랜드 아이스티"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <LabelSummary>이 칵테일을 한줄로 표현해주세요</LabelSummary>
            <InputSummary
              placeholder=" 술기운이 오래가는 콜라, 레몬이 섞인 묘한 맛!"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </TopCocktailSummary>
        </TopInfo>

        <BottomInfo>
          <IngredientLabel>재료 목록</IngredientLabel>

          {selectLines.map((line) => (
            <React.Fragment key={line.id}>
              <SelectList>
                <SelectLine>
                  <ListType>종류 :</ListType>
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
                  <ListAmount>수량 :</ListAmount>
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
            onChange={(e) => setRecipeStep(e.target.value)}
          />
        </BottomInfo>
        <SubmitButton type="submit" onClick={handleSubmitData}>
          SUBMIT
        </SubmitButton>
      </EditForm>
    </Container>
  );
};

export default CocktailRegistration;

const BottomInfo = styled.div`
  text-align: center;
  width: 50rem;
`;

const IconContainer = styled.div`
  display: inline-block;
`;

const UnitSelector = styled.select`
  margin: 0;
  padding: 0 0 0 5px;
  width: 5rem;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
`;

const DivisionLine = styled.div`
  padding: 15px;
  width: 50rem;
  border-top: 1px solid gray;
`;

const RecipeStep = styled.textarea`
  width: 50rem;
  height: 8rem;
  border-radius: 5px;
  padding: 10px;
  border: 0.5px solid gray;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const IngredientLabel = styled.div`
  width: 50rem;
  display: flex;
  margin: 10px;
  color: #828282;
  font-weight: 900;
`;

const TopInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const TopCocktailSummary = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const InputName = styled.input`
  width: 32rem;
  height: 2rem;
  padding: 5px;
  border-radius: 5px;
  border: 0.5px solid gray;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

const InputType = styled.input`
  margin: 0;
  padding: 5px;
  width: 39.5rem;
  margin-right: 1rem;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

const InputAmount = styled.input`
  margin-right: 1rem;
  padding: 5px;
  width: 33.5rem;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

const InputSummary = styled.input`
  width: 32rem;
  height: 8rem;
  padding: 5px;
  border-radius: 5px;
  border: 0.5px solid gray;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  ::placeholder {
    color: rgba(0, 0, 0, 0.2); /* 흐릿한 색상으로 변경 */
  }
`;

const LabelName = styled.label`
  width: 16rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const RecipeLabel = styled.label`
  width: 50rem;
  color: #828282;
  font-weight: 900;
  display: flex;
  margin: 10px;
`;

const LabelSummary = styled.label`
  width: 16rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const ListType = styled.label`
  margin-right: 2.5rem;
  font-weight: 900;
  color: #828282;
`;

const ListAmount = styled.label`
  margin-right: 2.5rem;
  font-weight: 900;
  color: #828282;
`;

const EditForm = styled.div`
  margin-top: 60px;
  width: 100%; //수치조정으로 Figma처럼 그림자 틀 조정가능아래 box-shadow 주석확인
  min-height: 100%;
  /* border-right: 1px solid lightgray;
  border-left: 1px solid lightgray; 
  box-shadow: 4px 0 4px rgba(0, 0, 0, 0.2);  */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const SelectLine = styled.div`
  margin: 5px;
  margin-left: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SubmitButton = styled.button`
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

const DeleteButton = styled(TiDelete)`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: red;
  display: none;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
`;

const SelectList = styled.div`
  height: 6rem;
  margin-bottom: 20px;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  position: relative; /* 수정: 추가 */
  &:hover {
    ${DeleteButton} {
      display: block;
    }
  }
`;

const OutIcon = styled(AiOutlinePlus)`
  font-size: 2rem;
  color: #96a5ff;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
`;

const FillIcon = styled(AiFillPlusCircle)`
  font-size: 2rem;
  color: #96a5ff;
  &:hover {
    cursor: pointer;
    color: #5d5d5d;
  }
`;
