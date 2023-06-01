import { useState } from "react";
import useVirtualList from "../../hooks/useVirtualList";
import VirtualList from "./VirtualList";
export const Container = () => {
  const [pageNum, setPageNum] = useState(1);

  const { data, isLoading, hasNext, error } = useVirtualList(pageNum);
  if (error) return <p>Error {error}</p>;
  const items = data.map((item) => item.title);

  return (
    <>
      <VirtualList items={items} itemHeight={30} containerHeight={100} />
    </>
  );
};
