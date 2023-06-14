import { PageInfo } from "../utils/query";

export default function useMainRecipePagination(
  pageinfo: PageInfo,
  setState: React.Dispatch<React.SetStateAction<number>>,
) {
  const hasMore = pageinfo.totalPage > pageinfo.page;
  const onNextClick = () => {
    setState((page) => (hasMore ? page + 1 : page));
  };
  const onPrevClick = () => {
    setState((page) => Math.max(page - 1, 1));
  };

  return { hasMore, onNextClick, onPrevClick };
}
