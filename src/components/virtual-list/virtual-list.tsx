import { useVirtualizer, VirtualItem } from '@tanstack/react-virtual'
import React, { ReactNode } from 'react'
import './css/virtual-list-style.css';

type VirtualListProps<T> = {
  className?: string,
  estimateSize: number,
  height: string,
  list: T[],
  overflow: string,
  renderRow: (item: any, virtualItem: VirtualItem) => ReactNode,
  width: string,
}

function VirtualList<T>(props: VirtualListProps<T>) {
  const parentRef = React.useRef(null)

  const rowVirtualizer = useVirtualizer({
    count: props.list.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => props.estimateSize,
    overscan: 5,
  })

  return (
    <>
      <div
        ref={parentRef}
        className="list-height"
        style={{
          // height: props.height,
          width: props.width,
          overflow: props.overflow,
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={props.className}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {props.renderRow(props.list[virtualRow.index], virtualRow)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export {
  VirtualList
}
