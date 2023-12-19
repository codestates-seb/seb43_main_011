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
  vaildCheck: {
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

export const explanationReducer = <T extends RecipeExplanation | ValidRecipe>(
  state: T,
  action: RecipeAction<T>,
) => ({ ...state, [action.target]: action.payload });

export const ingredientReducer = (
  state: Ingredient[],
  action: IngredientEditAction | { type: "add" },
) => {
  switch (action.type) {
    case "edit":
      const idx = state.findIndex((ingredient) => ingredient.id === action.id);
      const newIngredient = {
        ...state[action.id],
        [action.target]: action.payload,
      };
      return [...state.slice(0, idx), newIngredient, ...state.slice(idx)];
    case "add":
      // 폴리필 추가하면 at으로 변경 예정
      return [
        ...state,
        {
          ...RECIPE_INITIALSTATE.ingredient,
          id: state[state.length - 1].id + 1,
        },
      ];
  }
};

export interface RecipeDto {
  name: string;
  description: string;
  recipeStep: string;
  ingredient: string;
}

export interface ImageDto {
  id: number;
  formData: FormData;
}

export interface RecipeFormProps {
  postRecipe: <T>(recipeDto: RecipeDto) => Promise<T>;
  postImage: <T>(imageDto: ImageDto) => Promise<T>;
}

type ValidRecipe = typeof RECIPE_INITIALSTATE.vaildCheck;
type RecipeExplanation = typeof RECIPE_INITIALSTATE.explanation;

interface RecipeAction<T extends RecipeExplanation | ValidRecipe> {
  target: keyof T;
  payload: T extends RecipeExplanation ? string : boolean;
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
