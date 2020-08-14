import React, { useCallback } from 'react';
import { Poll } from 'which-types';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import RenderItem from './RenderItem';

interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
}

const PollsList: React.FC<PropTypes> = ({ polls, mutate }) => {
  const rowRenderer = useCallback(({ index, style, key }) => (
    <RenderItem
      polls={polls}
      mutate={mutate}
      index={index}
      style={style}
      key={key}
      _key={key}
    />
  ), [polls, mutate]);

  return (
    <WindowScroller>
      {({
        height,
        isScrolling,
        registerChild,
        onChildScroll,
        scrollTop
      }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <div ref={registerChild}>
              <List
                autoHeight
                height={height}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                rowCount={polls.length}
                rowHeight={550}
                rowRenderer={rowRenderer}
                scrollTop={scrollTop}
                width={width}
                containerStyle={{ pointerEvents: 'auto' }}
                overscanRowCount={2}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default PollsList;

