import React from 'react';

interface PropTypes {
  value: Date | string;
}

const DATE_FORMAT = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const DateString: React.FC<PropTypes> = ({ value }) => {
  const date = new Date(value);
  const formatted = date.toLocaleString('default', DATE_FORMAT);

  return <>{formatted}</>;
};

export default DateString;
