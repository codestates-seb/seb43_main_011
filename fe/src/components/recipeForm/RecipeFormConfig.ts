export const RECIPE_INITIALSTATE = {
  ingredient: {
    id: 0,
    stuff: "",
    amount: "",
    unit: "ml",
  } as Ingredient,
  explanation: {
    name: "",
    description: "",
    recipeStep: "",
  },
  invalidData: {
    name: false,
    description: false,
    recipeStep: false,
  },
};

export const INGREDIENT_UNIT = {
  ml: "ml",
  개: "개",
  spoon: "spoon",
  drops: "drops",
  slice: "slice",
  leaves: "leaves",
  peel: "peel",
  dash: "dash",
  gram: "gram",
} as const;

const INPUT_BUTTON_TEXT = {
  ragistration: {
    name: " 롱 아일랜드 아이스티",
    description: " 술기운이 오래가는 콜라, 레몬이 섞인 묘한 맛!",
    stuff: " 종류를 선택해주세요",
    amount: " 수량을 입력해주세요",
    recipeStep: `ex)
1.유리잔 테두리에 소금을 바른다.
2.얼음을 채운 셰이커에 데킬라 블랑코 50ml, 쿠앵트로(혹은 트리플 섹) 20ml을 붓는다.
3.라임 주스 15ml를 넣는다.
4.잘 흔들어 마가리타 잔에 따른다.`,
    submitButton: "Submit",
  },
  edit: {
    name: "",
    description: "",
    stuff: "ex) 화이트럼",
    amount: "ex) 30",
    recipeStep: "",
    submitButton: "Edit",
  },
};

/**true면 수정 edit페이지 text | false면 ragistration 페이지 text */
export const getInputOrButtonText = (flag: boolean) => {
  return flag ? INPUT_BUTTON_TEXT.edit : INPUT_BUTTON_TEXT.ragistration;
};

export const explanationReducer = <T extends RecipeExplanation | InvalidRecipe>(
  state: T,
  action: RecipeAction<T> | InitializeRecipe<T>,
) => {
  if (typeof action.payload === "object" && action.target === "init")
    return action.payload;
  else return { ...state, [action.target]: action.payload };
};

export const ingredientReducer = (
  state: Ingredient[],
  action:
    | IngredientEditAction
    | { type: "add" }
    | { type: "delete"; id: number }
    | { type: "init"; payload: Ingredient[] },
) => {
  switch (action.type) {
    case "edit":
      const idx = state.findIndex((ingredient) => ingredient.id === action.id);
      const newIngredient = {
        ...state[action.id],
        [action.target]: action.payload,
      };
      return [...state.slice(0, idx), newIngredient, ...state.slice(idx)];
    case "delete":
      if (state.length === 1) {
        return [
          {
            ...RECIPE_INITIALSTATE.ingredient,
            id: state.length ? state[state.length - 1].id + 1 : 0,
          },
        ];
      }
      return state.filter((ingredient) => ingredient.id !== action.id);
    case "add":
      // 폴리필 추가하면 at으로 변경 예정
      return [
        ...state,
        {
          ...RECIPE_INITIALSTATE.ingredient,
          id: state.length ? state[state.length - 1].id + 1 : 0,
        },
      ];
    case "init":
      return action.payload;
  }
};

export interface RecipeDto {
  name: string;
  description: string;
  recipe: string;
  ingredient: string;
}

export interface ImageDto {
  formData: FormData;
  id?: string;
}

interface RecipeDetail extends RecipeDto {
  [key: string]: string;
  imageUrl: string;
}

export interface RecipeFormProps {
  postRecipe: (recipeDto: RecipeDto) => Promise<any>;
  postImage: (imageDto: ImageDto) => Promise<any>;
  initData?: RecipeDetail;
}

export type InvalidRecipe = typeof RECIPE_INITIALSTATE.invalidData;
export type RecipeExplanation = typeof RECIPE_INITIALSTATE.explanation;

interface RecipeAction<T extends RecipeExplanation | InvalidRecipe> {
  target: keyof T;
  payload: T extends InvalidRecipe ? boolean : string;
}

interface InitializeRecipe<T extends RecipeExplanation | InvalidRecipe> {
  target: "init";
  payload: T;
}

interface Ingredient {
  id: number;
  stuff: string;
  amount: string;
  unit: keyof typeof INGREDIENT_UNIT;
}

interface IngredientEditAction {
  type: "edit";
  target: "stuff" | "amount" | "unit";
  payload: string;
  id: number;
}
