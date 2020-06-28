import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface PropTypes {
  displayD: boolean;
  setDisplayD: (d: boolean) => void;
  callback: (a: string) => void;
}

const UploadImage: React.FC<PropTypes> = ({
  displayD, setDisplayD, callback
}) => {
  const urlRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState('');

  const handleClose = () => {
    setDisplayD(false);
  };

  const update = () => {
    callback(urlRef.current?.value || '');
    setDisplayD(false);
  };

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <Dialog open={displayD} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Upload an Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Unfortunetly we do not support uploading images yet. Please provide a valid URL to your image.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image URL"
            type="text"
            fullWidth
            autoComplete="off"
            inputRef={urlRef}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={update} color="primary" disabled={!url.length}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadImage;
