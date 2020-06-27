import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { User } from 'which-types';
import { patch } from '../../requests';

interface PropTypes {
  displayD: boolean;
  setDisplayD: (d: boolean) => void;
  setUserInfo: (a: User) => void;
  setUser: (a: User) => void
}

const UploadImage: React.FC<PropTypes> = ({
  displayD, setDisplayD, setUserInfo, setUser
}) => {
  const urlRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setDisplayD(false);
  };

  const updateAvatar = () => {
    const id = localStorage.getItem('userId');
    const newAvatar = urlRef.current?.value;
    patch(`/users/${id}`, { avatarUrl: newAvatar }).then(res => {
      setUserInfo(res.data);
      setUser(res.data);
    });
    setDisplayD(false);
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateAvatar} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadImage;
