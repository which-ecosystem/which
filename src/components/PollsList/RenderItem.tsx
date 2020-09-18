import React, { useCallback } from 'react';
import { Poll } from 'which-types';
import PollCard from '../PollCard/PollCard';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';


interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
  index: number;
  style: React.CSSProperties;
  cache: CellMeasurerCache;
  parent: List;
  _key: string; // https://reactjs.org/warnings/special-props.html
}

const compareProps = (oldProps: PropTypes, newProps: PropTypes) => {
  if (oldProps._key !== newProps._key) return false;
  if (oldProps.index !== newProps.index) return false;
  if (oldProps.polls !== newProps.polls) return false;
  // Only listen for height changes in style
  if (oldProps.style.height !== newProps.style.height) return false;
  return true;
};

const RenderItem: React.FC<PropTypes> = React.memo(({
  polls, mutate, index, style, cache, parent, _key
}) => {
  const poll = polls[index];
  const setPoll = useCallback((newPoll: Poll) => {
    const newPolls = [...polls];
    newPolls[index] = newPoll;

    // Force-update list-size so everything re-renders
    mutate([], false);
    mutate(newPolls, false);
  }, [mutate, index, polls]);

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      rowIndex={index}
      parent={parent}
    >
      <div key={`${_key}-${poll._id}`} style={{...style, paddingBottom: '20px' }}>
        <PollCard poll={poll} setPoll={setPoll} />
      </div>
    </CellMeasurer>
  );
}, compareProps);


export default RenderItem;

