export const QUERY_KEY = {
  getCardsByAlcoholLevelKey: (level: string, page = 1, size = 5) => [
    level,
    page,
    size,
  ],
};

export const ALCOHOL_LEVEL_LIST = ["0", "1", "10", "20", "30"];
