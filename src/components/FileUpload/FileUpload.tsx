import React, { useEffect } from 'react';
import { useFilePicker, utils } from 'react-sage';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';

interface PropTypes {
  callback: (fileUrl: string, file: File) => void;
}


const FileUpload: React.FC<PropTypes> = ({ callback, children }) => {
  const { files, onClick, HiddenFileInput } = useFilePicker();

  useEffect(() => {
    if (files?.length) {
      const file = files[0];
      utils.loadFile(file).then(url => callback(url, file));
    }
  }, [files, callback]);

  const child = children && React.Children.toArray(children)[0];

  const defaultButton = (
    <Button
      onClick={onClick}
      variant="contained"
      color="primary"
      size="large"
      startIcon={<CloudUpload />}
    >
      Upload
    </Button>
  );

  return (
    <>
      <HiddenFileInput accept=".jpg, .jpeg, .png, .gif" multiple={false} />
      {React.isValidElement(child)
        ? React.cloneElement(child, { onClick })
        : defaultButton
      }
    </>
  );
};

export default FileUpload;
