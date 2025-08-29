import React, { useEffect, useState } from 'react';

export const useBlockSize = (
  blockRef: React.RefObject<HTMLDivElement | null>
) => {
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (!blockRef.current) return;

    const block = blockRef.current;

    setSize({
      height: block.clientHeight,
      width: block.clientWidth,
    });

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSize({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    observer.observe(block);

    return () => observer.disconnect();
  }, [blockRef]);

  return size;
};
