import React from 'react';
import { Poll } from 'which-types';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import PollCard from '../PollCard/PollCard';


interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
}

interface RenderPropTypes {
  index: number;
  key: string;
  style: React.CSSProperties;
}


const PollsList: React.FC<PropTypes> = ({ polls, mutate }) => {
  const RenderItem: React.FC<RenderPropTypes> = ({ index, style, key }) => {
    const poll = polls[index];

    const setPoll = (newPoll: Poll) => {
      const newPolls = [...polls];
      newPolls[index] = newPoll;

      // Force-update list-size so everything re-renders
      mutate([], false);
      mutate(newPolls, false);
    };

    return (
      // To re-render on list resize, add this info to key
      <div key={`${key}-${poll._id}-${polls.length}`} style={style}>
        <PollCard poll={poll} setPoll={setPoll} />
      </div>
    );
  };

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
};

export default PollsList;

