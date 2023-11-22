import * as React from 'react';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import Typography from '@mui/material/Typography';
const QuoteCompletion = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckCircleRoundedIcon
          style={{ fontSize: 80 }}
          fontSize='large'
          color='success'
        />
      </div>
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5' gutterBottom>
          We have received your request, will send you quote details to your
          Mail.
        </Typography>
      </div>
    </>
  );
};

export default QuoteCompletion;
