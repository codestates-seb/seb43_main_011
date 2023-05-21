import styled from "styled-components";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import React, { useState, useEffect } from "react";
import ImageUpload from "../components/imageupload/ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CocktailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // 해당 커스텀레시피 ID
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editRecipeStep, setEditRecipeStep] = useState<string>("");
  const [editSelectedImage, setEditSelectedImage] = useState<File>();
  const [editSelectLineId, setEditSelectLineId] = useState<number>(-1);
  const [ingredient, setIngredient] = useState([]);
  const [preview, setPeview] = useState("");
  const [editSelectLines, setEditSelectLines] = useState([
    { id: 0, stuff: "", amount: "", selectOption: "ml" },
  ]);

  interface GetRecipe {
    data: {
      id: number;
      imageUrl: string;
      // description: string;
      ingredient: string;
      name: string;
      recipe: string;
    };
  }
  const [getRecipe, setGetRecipe] = useState<GetRecipe | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://ec2-15-165-108-106.ap-northeast-2.compute.amazonaws.com:8080/custom/find/9`,
      );
      console.log(response.data.data);
      setIngredient(response.data.data.ingredient);
      setPeview(response.data.data.imageUrl);
      setEditName(response.data.data.name);
      setEditRecipeStep(response.data.data.recipe);
      setGetRecipe(response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // const updateRecipe = async (id: string, data: GetRecipe) => {
  //   try {
  //     const response = await axios.patch(
  //       `http://ec2-15-165-108-106.ap-northeast-2.compute.amazonaws.com:8080/custom/update/${id}`,
  //       data,
  //     );
  //     console.log(response.data);
  //     // return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     navigate("/error");
  //   }
  // };

  // 버튼효과
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // +버튼을 누르면 재료등록폼 추가
  const handleAddSelectLine = () => {
    const lastSelectLine = editSelectLines[editSelectLines.length - 1];
    const newId = lastSelectLine.id + 1;

    const newSelectLines = [
      ...editSelectLines,
      { id: newId, stuff: "", amount: "", selectOption: "ml" },
    ];
    setEditSelectLines(newSelectLines);
  };

  // X버튼을 누르면 재료등록리스트 삭제
  const handleDeleteSelectLine = (id: number) => {
    const isCurrentSelection = id === editSelectLineId; // 현재 선택된 항목인지 확인

    const newSelectLines = editSelectLines.filter((line) => line.id !== id);
    setEditSelectLines(newSelectLines);

    if (isCurrentSelection) {
      setEditSelectLineId(-1);
    }
  };

  const handleSubmitData = async () => {
    const totalData = editSelectLines
      .map((line) => {
        return line.stuff + line.amount + line.selectOption;
      })
      .join("\n");
  };

  const handleImageUpload = (image: File) => {
    setEditSelectedImage(image);
  };

  return (
    <Container>
      <EditForm>
        <TopInfo>
          <ImageUpload onImageUpload={handleImageUpload} />
          <TopCocktailSummary>
            <LabelName>이름을 알려주세요</LabelName>
            <InputName
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <LabelSummary>이 칵테일을 한줄로 표현해주세요</LabelSummary>
            <InputSummary
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </TopCocktailSummary>
        </TopInfo>

        <BottomInfo>
          <IngredientLabel>재료 목록</IngredientLabel>
          {editSelectLines.map((line) => (
            <React.Fragment key={line.id}>
              <SelectList>
                <SelectLine>
                  <ListType>종류 :</ListType>
                  <InputType
                    value={line.stuff}
                    onChange={(e) => {
                      const skdmlrjt = editSelectLines.map((item) =>
                        item.id === line.id
                          ? { ...item, stuff: e.target.value }
                          : item,
                      );
                      setEditSelectLines(skdmlrjt);
                    }}
                  />
                  <DeleteButton
                    onClick={() => handleDeleteSelectLine(line.id)}
                  />
                </SelectLine>
                <SelectLine>
                  <ListAmount>수량 :</ListAmount>
                  <InputAmount
                    value={line.amount}
                    onChange={(e) => {
                      const skdmlrjt = editSelectLines.map((item) =>
                        item.id === line.id
                          ? { ...item, amount: e.target.value }
                          : item,
                      );
                      setEditSelectLines(skdmlrjt);
                    }}
                  />
                  <UnitSelector
                    value={line.selectOption}
                    onChange={(e) => {
                      const skdmlrjt = editSelectLines.map((item) =>
                        item.id === line.id
                          ? { ...item, selectOption: e.target.value }
                          : item,
                      );
                      setEditSelectLines(skdmlrjt);
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
            value={editRecipeStep}
            onChange={(e) => setEditRecipeStep(e.target.value)}
          />
        </BottomInfo>
        <SubmitButton type="submit" onClick={handleSubmitData}>
          SUBMIT
        </SubmitButton>
      </EditForm>
    </Container>
  );
};

export default CocktailEdit;

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
