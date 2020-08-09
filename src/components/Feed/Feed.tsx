import React from 'react';
import { Poll } from 'which-types';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import PollCard from '../PollCard/PollCard';
import Loading from '../Loading/Loading';

interface PropTypes {
  polls: Poll[];
}

interface RenderPropTypes {
  index: number;
  key: string;
  style: React.CSSProperties;
}


const Feed: React.FC<PropTypes> = ({ polls }) => {
  const RenderItem: React.FC<RenderPropTypes> = ({ index, style, key }) => {
    const poll = polls[index];
    return (
      // To re-render on list resize, add this info to key
      <div key={key + polls.length} style={style}>
        <PollCard initialPoll={poll} />
      </div>
    );
  };

  const list = (
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
                rowRenderer={RenderItem}
                scrollTop={scrollTop}
                width={width}
                containerStyle={{ pointerEvents: 'auto' }}
                overscanRowCount={1}
              />
            </div>
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );

  return polls.length ? list : <Loading />;
};

export default Feed;

