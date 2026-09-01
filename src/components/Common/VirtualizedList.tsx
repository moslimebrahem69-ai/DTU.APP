import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useVirtualization } from '../../hooks/useVirtualization';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

export function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className
}: VirtualizedListProps<T>) {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  
  const { visibleItems, setScrollTop } = useVirtualization({
    items,
    itemHeight,
    containerHeight
  });

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, [setScrollTop]);

  return (
    <div
      ref={scrollElementRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: visibleItems.totalHeight, position: 'relative' }}>
        <motion.div
          style={{
            transform: `translateY(${visibleItems.offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
          layout
        >
          {visibleItems.items.map((item, index) => (
            <div key={visibleItems.startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, visibleItems.startIndex + index)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}