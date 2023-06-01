import { useState, useRef, useEffect } from "react";

interface VirtualListProps {
  items: [];
  itemHeight: number;
  containerHeight: number;
}

const VirtualList = ({
  items,
  itemHeight,
  containerHeight,
}: VirtualListProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    Math.ceil(containerHeight / itemHeight)
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop } = container;
      const newStartIndex = Math.floor(scrollTop / itemHeight);
      const newEndIndex = Math.min(
        newStartIndex + Math.ceil(containerHeight / itemHeight),
        items.length - 1
      );

      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [items.length, itemHeight, containerHeight]);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}px`, overflow: "auto" }}
    >
      <div style={{ height: `${startIndex * itemHeight}px` }} />

      {visibleItems.map((item, index) => (
        <div key={startIndex + index} style={{ height: `${itemHeight}px` }}>
          {item}
        </div>
      ))}

      <div
        style={{ height: `${(items.length - endIndex - 1) * itemHeight}px` }}
      />
    </div>
  );
};

export default VirtualList;
