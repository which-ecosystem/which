import React from 'react';
import { Poll } from 'which-types';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';
import CircularProgress from '@material-ui/core/CircularProgress';
import PollCard from '../PollCard/PollCard';
import {makeStyles} from "@material-ui/core";

interface PropTypes {
  polls: Poll[];
}

interface RenderPropTypes {
  index: number;
  key: string;
  style: React.CSSProperties;
}

const useStyles = makeStyles(theme => ({
  loader: {
    width:'100%',
    textAlign:'center',
    marginTop:theme.spacing(10)
  }
}));

const Feed: React.FC<PropTypes> = ({ polls }) => {
  const classes = useStyles();


  const RenderItem: React.FC<RenderPropTypes> = ({ index, style, key }) => {
    const poll = polls[index];
    return (
      <div key={key} style={style}>
        <PollCard initialPoll={poll} />
      </div>
    );
  };

  const loader = <div className={classes.loader}>
    <CircularProgress color="primary" style={{margin: '0 auto'}}/>
  </div>

  const list =  <WindowScroller>
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

  return polls.length ? list : loader;
};

export default Feed;

