import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Label } from '@mui/icons-material';



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUpload = ({ id, uploadFileData, fileData, index }) => {
  return (
    <>
      <Button
        component='label'
        variant='contained'
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type='file'
          onChange={(event) => uploadFileData(event, id, index)}
        />
      </Button>
      {fileData && fileData.name && (
        <label style={{ marginLeft: 10 }}>{fileData.name}</label>
      )}
    </>
  );
};

export default FileUpload;
