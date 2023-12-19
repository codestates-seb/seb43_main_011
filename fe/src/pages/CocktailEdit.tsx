import { useNavigate, useParams } from "react-router-dom";
import { Line } from "../utils/query";
import React, { useState, useEffect, KeyboardEvent } from "react";
import { useQuery, useMutation } from "react-query";
import FormData from "form-data";
import { tokenInstance } from "../utils/tokeninstance";
import {
  Container,
  EditForm,
  TopInfo,
  TopCocktailSummary,
  LabelName,
  InputName,
  LabelSummary,
  InputSummary,
  BottomInfo,
  IngredientLabel,
  SelectList,
  SelectLine,
  InputType,
  DeleteButton,
  InputAmount,
  UnitSelector,
  DivisionLine,
  IconContainer,
  FillIcon,
  OutIcon,
  RecipeLabel,
  RecipeStep,
  SubmitButton,
  ListLabel,
} from "./CocktailRegistration";
import ImageUpload from "../components/imageupload/ImageUpload";

const CocktailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [EditpreviewImage, setEditPreviewImage] = useState<string>("");
  const [selectLineId, setSelectLineId] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editRecipeStep, setEditRecipeStep] = useState<string>("");
  const fetchData = async () => {
    const response = await tokenInstance.get(`/custom/find/${id}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery("myData", fetchData);
  if (error) {
    navigate("/error");
  }

  const [selectLines, setSelectLines] = useState<Line[]>([]);

  useEffect(() => {
    interface Line {
      id: number;
      stuff: string;
      amount: string;
      selectOption: string;
    }
    if (!isLoading && data) {
      setEditPreviewImage(data?.data.imageUrl);
      setEditName(data?.data.name);
      setEditRecipeStep(data?.data.recipe);
      setEditDescription(data?.data.description);

      const regex = /[0-9]/g;
      const numReg = /\d+/g;
      const separator = new RegExp(`${"\n|\\\\n"}`);
      const rowStuff = data?.data.ingredient;
      const myStuff =
        rowStuff &&
        rowStuff.split(separator).map((e: string) => {
          const arr = e.split(regex).filter((letter) => letter !== "");
          const num = e.match(numReg)?.map((x) => x);
          if (num) arr.push(num[0]);
          return arr;
        });
      const initialSelectLines: Line[] = myStuff.map(
        (item: string, index: number) => ({
          id: index,
          stuff: item[0], // 서버에서 가져온 데이터의 값으로 설정
          amount: item[2], // 서버에서 가져온 데이터의 값으로 설정
          selectOption: item[1], // 서버에서 가져온 데이터의 값으로 설정
        }),
      );

      setSelectLines(initialSelectLines);
    }
  }, [data, isLoading]);
  // 버튼효과
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }

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

  const handleImageUpload = (image: File) => {
    setSelectedImage(image);
  };

  interface NewRecipe {
    description: string;
    ingredient: string;
    name: string;
    recipe: string;
  }

  interface NewImage {
    id: string | undefined;
    formData: FormData;
  }
  const postCustomRecipe = async (data: NewRecipe) => {
    try {
      const content = JSON.stringify(data);

      const response = await tokenInstance.patch(
        `/custom/update/content/${id}`,
        content,
      );

      return response.data;
    } catch {}
  };

  const postCustomImage = async (data: NewImage) => {
    try {
      const response = await tokenInstance.post(
        `/custom/submit/image/${data.id}`,
        data.formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return response.data;
    } catch {}
  };

  const recipeMutation = useMutation(postCustomRecipe);
  const imageMutation = useMutation(postCustomImage);

  //PATCH요청 보내는곳
  const handleEditData = async () => {
    const totalData = selectLines
      .map((line) => {
        return line.stuff + line.amount + line.selectOption;
      })
      .join("\n");

    const customRecipeCreateDto = {
      name: editName,
      description: editDescription,
      recipe: editRecipeStep,
      ingredient: totalData,
    };

    try {
      await recipeMutation.mutateAsync(customRecipeCreateDto);
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const imageInput = {
          id: id,
          formData: formData,
        };

        await imageMutation.mutateAsync(imageInput);
      }
      navigate("/custom");
    } catch (error) {
      console.error("PATCH 요청 에러:", error);
    }
  };

  return (
    <Container>
      <EditForm>
        <TopInfo>
          <ImageUpload
            onImageUpload={handleImageUpload}
            isEmpty={!selectedImage}
            initialImage={EditpreviewImage}
          />
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

          {selectLines.map((line) => (
            <React.Fragment key={line.id}>
              <SelectList>
                <SelectLine>
                  <ListLabel>종류 :</ListLabel>
                  <InputType
                    placeholder="ex) 화이트럼"
                    onKeyDown={handleKeyDown}
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
                    placeholder="ex) 30"
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
            value={editRecipeStep}
            onChange={(e) => setEditRecipeStep(e.target.value)}
          />
        </BottomInfo>
        <SubmitButton onClick={handleEditData}>EDIT</SubmitButton>
      </EditForm>
    </Container>
  );
};

export default CocktailEdit;
