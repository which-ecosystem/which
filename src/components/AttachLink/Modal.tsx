import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, useTheme, useMediaQuery
} from '@material-ui/core';

interface PropTypes {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  callback: (url: string) => void;
}

const Modal: React.FC<PropTypes> = ({ setIsOpen, isOpen, callback }) => {
  const [url, setUrl] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    let result = url;
    if (url.startsWith('https://www.instagram.com/')) {
      const match = url.match('/p/(.*)/');
      const id = match && match[1];
      result = `https://www.instagram.com/p/${id}/media/?size=l`;
    } else if (url.startsWith('https://drive.google.com/')) {
      const match = url.match('/d/(.*)/');
      const fileId = match && match[1];
      result = `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    callback(result || '');
    handleClose();
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  return (
    <div>
      <Dialog fullScreen={isMobile} open={isOpen} onClose={handleClose}>
        <DialogTitle>Upload via link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide a valid URL to your image:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image URL"
            type="text"
            fullWidth
            autoComplete="off"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!url.length}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
