import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  WindowScroller,
  AutoSizer,
  List,
  InfiniteLoader,
  CellMeasurerCache
} from 'react-virtualized';
import _ from 'lodash';
import { Poll } from 'which-types';

import RenderItem from './RenderItem';

interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
}

const cache = new CellMeasurerCache({
  fixedWidth: true
});

const PAGE_SIZE = 10;

const PollsList: React.FC<PropTypes> = ({ polls, mutate }) => {
  const [displayCount, setDisplayCount] = useState<number>(PAGE_SIZE);

  useEffect(() => {
    cache.clearAll();
  }, [polls]);

  const rowRenderer = useCallback(({ index, style, key, parent }) => (
    <RenderItem
      polls={polls}
      mutate={mutate}
      index={index}
      style={style}
      cache={cache}
      parent={parent}
      key={key}
      _key={key}
    />
  ), [polls, mutate]);

  const loadMoreRows = useCallback(async () => {
    setDisplayCount(previousCount => previousCount + PAGE_SIZE);
  }, []);

  const isRowLoaded = useCallback(({ index }) => {
    return index < displayCount - 1 || displayCount === polls.length;
  }, [displayCount, polls]);

  const rowCount = useMemo(() => {
    return _.min([displayCount, polls.length]) || polls.length;
  }, [displayCount, polls.length]);

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
                rowCount={rowCount}
                threshold={1}
              >
                {({ onRowsRendered, registerChild: ref }) => (
                  <List
                    autoHeight
                    height={height}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    rowCount={rowCount}
                    rowHeight={cache.rowHeight}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    width={width}
                    containerStyle={{ pointerEvents: 'auto' }}
                    overscanRowCount={2}
                    onRowsRendered={onRowsRendered}
                    ref={ref}
                    deferredMeasurementCache={cache}
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

