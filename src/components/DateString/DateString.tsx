import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import compactDateString from './compactDateString';

interface PropTypes {
  value: Date | string;
}

const useStyles = makeStyles({
  root: {
    display: 'block',
    cursor: 'pointer'
  }
});

const DATE_FORMAT = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const DateString: React.FC<PropTypes> = ({ value }) => {
  const [isCompact, setIsCompact] = useState<boolean>(true);
  const classes = useStyles();

  const toggleScompact = useCallback(() => setIsCompact(v => !v), [setIsCompact]);

  const date = useMemo(() => new Date(value), [value]);
  const formatted = useMemo(() => date.toLocaleString('default', DATE_FORMAT), [date]);
  const compact = useMemo(() => compactDateString(date), [date]);

  return (
    <div role="presentation" className={classes.root} onClick={toggleScompact}>
      {isCompact ? compact : formatted}
    </div>
  );
};

export default DateString;
