import React from 'react';

interface PropTypes {
  src?: string;
  alt?: string;
  className?: string;
}

const Image: React.FC<PropTypes> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};

export default Image;

