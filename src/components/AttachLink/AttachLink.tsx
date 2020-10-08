import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import LinkIcon from '@material-ui/icons/Link';
import Modal from './Modal';

interface PropTypes {
  callback: (url: string) => void;
}

const AttachLink: React.FC<PropTypes> = ({ callback, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const defaultButton = (
    <Button
      onClick={handleOpen}
      variant="outlined"
      color="primary"
      startIcon={<LinkIcon />}
    >
      Link
    </Button>
  );

  const child = children && React.Children.only(children);

  return (
    <>
      <Modal callback={callback} isOpen={isOpen} setIsOpen={setIsOpen} />
      {
        React.isValidElement(child)
          ? React.cloneElement(child, { onClick: handleOpen })
          : defaultButton
      }
    </>
  );
};

export default AttachLink;
