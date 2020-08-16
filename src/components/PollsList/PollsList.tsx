import React, { useCallback, useState } from 'react';
import {
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoader
} from 'react-virtualized';
import _ from 'lodash';
import { Poll } from 'which-types';

import RenderItem from './RenderItem';

interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
}

const PAGE_SIZE = 10;

const PollsList: React.FC<PropTypes> = ({ polls, mutate }) => {
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE);

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

  const loadMoreRows = useCallback(async () => {
    setDisplayCount(previousCount => {
      return _.min([polls.length, previousCount + PAGE_SIZE]) || polls.length;
    });
  }, [polls]);

  const isRowLoaded = useCallback(({ index }) => {
    return index < displayCount - 1 || displayCount === polls.length;
  }, [displayCount, polls]);

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
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={displayCount}
                threshold={1}
              >
                {({ onRowsRendered, registerChild: ref }) => (
                  <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={displayCount}
                    rowHeight={550}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                    containerStyle={{ pointerEvents: 'auto' }}
                    overscanRowCount={2}
                    onRowsRendered={onRowsRendered}
                    ref={ref}
                  />
                )}
              </InfiniteLoader>
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default PollsList;

