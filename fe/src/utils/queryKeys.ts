export const queryKeys = {
  recipes: ["recipe"] as const,
  recipeCategory: (path: string, listSize: number, page: number) => [
    queryKeys.recipes,
    path,
    listSize,
    page,
  ],
  searched: (path: string, searchValue: string, page: number) => [
    queryKeys.recipes,
    "searched",
    path,
    searchValue,
    page,
  ],
  detail: (id: string, category: string) => [
    queryKeys.recipes,
    "detail",
    id,
    category,
  ],
};
