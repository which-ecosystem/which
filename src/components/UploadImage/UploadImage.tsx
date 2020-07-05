import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch
} from '@material-ui/core';

interface PropTypes {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  callback: (url: string) => void;
}

const UploadImage: React.FC<PropTypes> = ({ setIsOpen, isOpen, callback }) => {
  const [url, setUrl] = useState<string>('');
  const [isInstagramLink, setIsInstagramLink] = useState<boolean>(false);


  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    const result = isInstagramLink ? `${url.slice(0, url.length - 29)}/media/?size=l` : url;
    console.log(result)
    callback(result || '');
    handleClose();
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSwitch = () => {
    setIsInstagramLink(!isInstagramLink);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Upload an Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unfortunetly we do not support uploading images yet. Please provide a valid URL to your image:
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
          <FormControlLabel
            control={<Switch color="primary" onClick={handleSwitch} checked={isInstagramLink} size="small" />}
            label="It's an Instagram link"
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

export default UploadImage;
