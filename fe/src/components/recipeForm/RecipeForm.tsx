import { useMutation } from "react-query";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";
import styled from "styled-components";
import ImageUpload from "../imageupload/ImageUpload";
import { useLayoutEffect, useReducer, useState } from "react";
import { AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import {
  RecipeFormProps,
  explanationReducer,
  ingredientReducer,
  RECIPE_INITIALSTATE,
  RecipeExplanation,
  InvalidRecipe,
  INGREDIENT_UNIT,
  getInputOrButtonText,
} from "./RecipeFormConfig";
import { useNavigate } from "react-router-dom";

export default function RecipeForm({
  postImage,
  postRecipe,
  initData,
}: RecipeFormProps) {
  const navigate = useNavigate();
  /**ture면 edit 페이지 false면 ragistration 페이지 */
  const hasInitData = initData !== undefined;
  const [recipeExplanation, explanationDispatch] = useReducer(
    explanationReducer<RecipeExplanation>,
    RECIPE_INITIALSTATE.explanation,
  );
  const [ingredients, ingredientsDispatch] = useReducer(ingredientReducer, [
    RECIPE_INITIALSTATE.ingredient,
  ]);
  const [invalidRecipe, validRecieDispatch] = useReducer(
    explanationReducer<InvalidRecipe>,
    RECIPE_INITIALSTATE.invalidData,
  );
  const [selectedImage, setSelectedImage] = useState<File>();

  const validator: { [key: string]: (value: string) => boolean } = {
    name: (value: string) => /^[가-힣\s()]+$/.test(value),
    description: (value: string) => /[가-힣a-zA-Z0-9\s.()!]{3,}/.test(value),
    recipeStep: (value: string) =>
      /^[ㄱ-ㅎ가-힣]*([a-zA-Z0-9\n() ,.!]*[ㄱ-ㅎ가-힣]*)*$/.test(value),
    stuff: (value: string) => /^[가-힣a-zA-Z\s]+$/.test(value),
    amount: (value: string) => /^\d+$/.test(value),
  };

  useLayoutEffect(() => {
    if (hasInitData) {
      explanationDispatch({
        target: "init",
        payload: {
          name: initData.name,
          description: initData.description,
          recipeStep: initData.recipe,
        },
      });
      const numReg = /\d+/g,
        separator = new RegExp(`${"\n|\\\\n"}`);
      const userIngredients = initData.ingredient
        .split(separator)
        .map((line) => {
          const ingredient = line.split(numReg).filter((str) => str !== "");
          line.match(numReg)?.forEach((num) => ingredient.push(num));
          return ingredient;
        })
        .map(([stuff, unit, amount], i) => ({
          id: i,
          stuff,
          unit: unit as keyof typeof INGREDIENT_UNIT,
          amount,
        }));
      ingredientsDispatch({ type: "init", payload: userIngredients });
    }
  }, [initData]);

  const recipeMutation = useMutation(postRecipe);
  const imageMutation = useMutation(postImage);
  const deleteMutation = useDeleteRecipe();
  /**이미지 업로드 함수 */
  const imageUploadHandle = (image: File) => {
    setSelectedImage(image);
  };

  const onSubmitHandle = () => {
    const wrongIngredient: number[] = [];
    const { name, description, recipeStep } = recipeExplanation;
    const totalIngredients = ingredients
      .map((ingredient, i) => {
        const { stuff, amount, unit } = ingredient;
        // ingredient의 amount, stuff 유효성은 따로 검사
        if (!validator.amount(amount) || !validator.stuff(stuff))
          wrongIngredient.push(i + 1);
        else return stuff + amount + unit;
      })
      .join("\n");
    // name, description, recipeStep 유효성 검사
    for (const key in recipeExplanation) {
      validRecieDispatch({
        target: key as keyof InvalidRecipe,
        payload: !validator[key](
          recipeExplanation[key as keyof RecipeExplanation],
        ),
      });
    }
    if (invalidRecipe.name) {
      window.alert("레시피 이름은 한글로만 작성 가능합니다.");
    } else if (invalidRecipe.description) {
      window.alert(
        `칵테일 소개는 최소 3글자 이상의 한줄로 작성해 주세요.
        특수문자는 !(). 만 가능합니다.`,
      );
    } else if (wrongIngredient.length > 0) {
      window.alert(
        `${wrongIngredient.join(" ")} 번째 재료가 잘못 입력되었습니다.`,
      );
    } else if (invalidRecipe.recipeStep) {
      window.alert(
        `레시피 양식을 토대로 다시 작성해 주세요.
        특수문자는 (),.! 만 가능합니다.`,
      );
    } else {
      const customRecipeCreateDto = {
        name,
        description,
        ingredient: totalIngredients,
        recipe: recipeStep,
      };
      recipeMutation.mutate(customRecipeCreateDto, {
        onSuccess: (recipeId) => {
          const formData = new FormData();
          if (selectedImage !== undefined) {
            formData.append("image", selectedImage);
            const cocktailImageDto = {
              formData,
              id: recipeId,
            };
            imageMutation.mutate(cocktailImageDto, {
              onSuccess: () => {
                navigate("/custom");
              },
              onError: () => {
                window.alert("이미지 등록실패, 이미지의 크기가 너무 큽니다");
                if (hasInitData) deleteMutation.mutateAsync(recipeId);

                validRecieDispatch({
                  target: "init",
                  payload: RECIPE_INITIALSTATE.invalidData,
                });
                explanationDispatch({
                  target: "init",
                  payload: RECIPE_INITIALSTATE.explanation,
                });
                ingredientsDispatch({
                  type: "init",
                  payload: [RECIPE_INITIALSTATE.ingredient],
                });
              },
            });
          }
          navigate("/custom");
        },
      });
    }
  };

  return (
    <EditForm>
      <TopInfo>
        <ImageUpload
          onImageUpload={imageUploadHandle}
          isEmpty={!selectedImage}
          initialImage={hasInitData ? initData.imageUrl : undefined}
        />
        <TopCocktailSummary>
          <LabelName>이름을 알려주세요</LabelName>
          <InputName
            placeholder={getInputOrButtonText(hasInitData).name}
            value={recipeExplanation.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              explanationDispatch({
                target: "name",
                payload: e.target.value,
              })
            }
            isNotOk={invalidRecipe.name}
          />
          <LabelSummary>이 칵테일을 한줄로 표현해주세요</LabelSummary>
          <InputSummary
            placeholder={getInputOrButtonText(hasInitData).description}
            value={recipeExplanation.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              explanationDispatch({
                target: "description",
                payload: e.target.value,
              })
            }
            isNotOk={invalidRecipe.description}
          />
        </TopCocktailSummary>
      </TopInfo>

      <BottomInfo>
        <IngredientLabel>재료 목록</IngredientLabel>

        {ingredients.map((ingredient) => (
          <SelectList key={ingredient.id}>
            <SelectLine>
              <ListLabel>종류 :</ListLabel>
              <InputType
                placeholder={getInputOrButtonText(hasInitData).stuff}
                value={ingredient.stuff}
                onChange={(e) => {
                  ingredientsDispatch({
                    type: "edit",
                    target: "stuff",
                    payload: e.target.value,
                    id: ingredient.id,
                  });
                }}
              />
              <DeleteButton
                onClick={() =>
                  ingredientsDispatch({ type: "delete", id: ingredient.id })
                }
              />
            </SelectLine>
            <SelectLine>
              <ListLabel>수량 :</ListLabel>
              <InputAmount
                placeholder={getInputOrButtonText(hasInitData).amount}
                value={ingredient.amount}
                onChange={(e) => {
                  ingredientsDispatch({
                    type: "edit",
                    target: "amount",
                    payload: e.target.value,
                    id: ingredient.id,
                  });
                }}
              />
              <UnitSelector
                value={ingredient.unit}
                onChange={(e) => {
                  ingredientsDispatch({
                    type: "edit",
                    target: "unit",
                    payload: e.target.value,
                    id: ingredient.id,
                  });
                }}
              >
                {Object.keys(INGREDIENT_UNIT).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </UnitSelector>
            </SelectLine>
          </SelectList>
        ))}

        <DivisionLine>
          <IconContainer onClick={() => ingredientsDispatch({ type: "add" })}>
            <FillIcon />
            <OutIcon />
          </IconContainer>
        </DivisionLine>

        <RecipeLabel>레시피를 단계별로 설명해 주세요</RecipeLabel>
        <RecipeStep
          placeholder={getInputOrButtonText(hasInitData).recipeStep}
          value={recipeExplanation.recipeStep}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            explanationDispatch({
              target: "recipeStep",
              payload: e.target.value,
            });
          }}
          isNotOk={invalidRecipe.recipeStep}
        />
      </BottomInfo>
      <SubmitButton onClick={onSubmitHandle}>
        {hasInitData ? "Edit" : "Submit"}
      </SubmitButton>
    </EditForm>
  );
}
interface IsNotOkProps {
  isNotOk?: boolean;
}

const EditForm = styled.div`
  margin-top: 60px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const TopInfo = styled.div`
  display: flex;
  margin-bottom: 2rem;
  max-width: 800px;
  width: 100%;
  @media screen and (max-width: 640px) {
    padding: 0 10px;
  }
`;

const TopCocktailSummary = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 10px;
`;

const LabelName = styled.label`
  width: 16rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const InputName = styled.input<IsNotOkProps>`
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

const LabelSummary = styled.label`
  width: 16rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

const InputSummary = styled.input<IsNotOkProps>`
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

const BottomInfo = styled.div`
  text-align: center;
  max-width: 50rem;
  width: 100%;
  @media screen and (max-width: 640px) {
    padding: 0 10px;
  }
`;

const IngredientLabel = styled.div`
  max-width: 50rem;
  width: 100%;
  display: flex;
  margin: 10px;
  color: #828282;
  font-weight: 900;
`;

const DeleteButton = styled(TiDelete)`
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

const SelectList = styled.div`
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

const SelectLine = styled.div`
  max-width: 758px;
  width: 100%;
  margin: 5px auto;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const ListLabel = styled.label`
  margin-right: 2rem;
  font-weight: 900;
  color: #828282;
  width: 10%;
  @media screen and (max-width: 600px) {
    width: 13%;
  }
`;

const InputType = styled.input`
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

const InputAmount = styled.input`
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

const UnitSelector = styled.select`
  margin: 0;
  padding: 0 0 0 5px;
  max-width: 5rem;
  width: 10%;
  height: 1.5rem;
  border: 0.5px solid gray;
  border-radius: 5px;
`;

const DivisionLine = styled.div`
  padding: 15px;
  width: 100%;
  max-width: 50rem;
  border-top: 1px solid gray;
`;

const IconContainer = styled.div`
  display: inline-block;
  & > svg:nth-child(1) {
    display: none;
  }
  & > svg:nth-child(2) {
    display: block;
  }
  &:hover {
    & > svg:nth-child(1) {
      display: block;
    }
    & > svg:nth-child(2) {
      display: none;
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

const RecipeLabel = styled.label`
  width: 50rem;
  color: #828282;
  font-weight: 900;
  display: flex;
  margin: 10px;
`;

const RecipeStep = styled.textarea<IsNotOkProps>`
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
