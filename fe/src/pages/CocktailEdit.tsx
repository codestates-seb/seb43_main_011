import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { Line } from "../utils/query";
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useQuery, useMutation } from "react-query";
import FormData from "form-data";
import { FcEditImage } from "react-icons/fc";
import { tokenInstance } from "../utils/tokeninstance";

const CocktailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [EditpreviewImage, setEditPreviewImage] = useState<string>("");
  const [selectLineId, setSelectLineId] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
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

  const handleUploadImage = () => {
    // 파일 선택(input) 요소를 클릭하여 이미지 선택 다이얼로그 표시
    if (inputFileRef.current !== undefined) {
      inputFileRef.current?.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 선택한 이미지 파일
    if (file) {
      handleUploadImage();
      setEditPreviewImage(URL.createObjectURL(file)); // 미리보기 이미지 URL 설정
      setSelectedImage(file);
    }
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
          <UploadImgButton onClick={handleUploadImage}>
            {data ? (
              <PreviewImg src={EditpreviewImage} alt="Preview" />
            ) : (
              <UploadImgIcon />
            )}
          </UploadImgButton>
          <UploadImgInput
            type="file"
            ref={inputFileRef}
            onChange={handleImageChange}
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
                  <ListType>종류 :</ListType>
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
                  <ListAmount>수량 :</ListAmount>
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
  align-items: center;
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

const UploadImgIcon = styled(FcEditImage)`
  font-size: 3rem;
`;

const UploadImgButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-top: 5rem;
  width: 16rem;
  height: 16rem;
  border: none;
  background: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const UploadImgInput = styled.input`
  display: none;
`;
