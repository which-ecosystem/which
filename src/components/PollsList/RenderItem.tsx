import React, { useCallback } from 'react';
import { Poll } from 'which-types';
import PollCard from '../PollCard/PollCard';


interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
  index: number;
  style: React.CSSProperties;
  _key: string; // https://reactjs.org/warnings/special-props.html
}

const compareProps = (oldProps: PropTypes, newProps: PropTypes) => {
  if (oldProps._key !== newProps._key) return false;
  if (oldProps.index !== newProps.index) return false;
  if (oldProps.polls !== newProps.polls) return false;
  // TODO: uncomment line below to listen to style updates
  // if (JSON.stringify(oldProps.style)!== JSON.stringify(newProps.style)) return false;
  return true;
};

const RenderItem: React.FC<PropTypes> = React.memo(({
  polls, mutate, index, style, _key
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
    <div key={_key} style={style}>
      <PollCard poll={poll} setPoll={setPoll} />
    </div>
  );
}, compareProps);


export default RenderItem;

