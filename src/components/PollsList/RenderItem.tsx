import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Poll } from 'which-types';
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import PollCard from '../PollCard/PollCard';


interface PropTypes {
  polls: Poll[];
  mutate: (polls: Poll[], refetch: boolean) => void;
  index: number;
  style: React.CSSProperties;
  cache: CellMeasurerCache;
  parent: List;
  _key: string; // https://reactjs.org/warnings/special-props.html
}

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(8)
  }
}));

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
  const classes = useStyles();
  const poll = polls[index];
  const setPoll = useCallback((newPoll: Poll | null) => {
    let newPolls = polls;
    if (newPoll) newPolls[index] = newPoll;
    else newPolls = newPolls.filter((poll, pollIndex) => pollIndex !== index);

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
      <div key={`${_key}-${poll._id}`} className={classes.root} style={style}>
        <PollCard poll={poll} setPoll={setPoll} />
      </div>
    </CellMeasurer>
  );
}, compareProps);


export default RenderItem;

