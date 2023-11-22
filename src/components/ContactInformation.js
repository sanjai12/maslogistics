import * as React from 'react';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PublicIcon from '@mui/icons-material/Public';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

const ContactInformation = () => {
  return (
    <>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
        style={{ paddingBottom: 20 }}
      >
        <Grid item xs={12}>
          <TextField
            fullWidth
            id='input-with-icon-textfield'
            label='Company Name'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <CorporateFareIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
        style={{ paddingBottom: 20 }}
      >
        <Grid item xs={6}>
          <TextField
            id='input-with-icon-textfield'
            label='Client Name'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='input-with-icon-textfield'
            label='Country'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PublicIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
        style={{ paddingBottom: 20 }}
      >
        <Grid item xs={6}>
          <TextField
            id='input-with-icon-textfield'
            label='Email Address'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='input-with-icon-textfield'
            label='Phone'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PhoneIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
        style={{ paddingBottom: 20 }}
      >
        <Grid item xs={12}>
          <TextField
            id='input-with-icon-textfield'
            label='Address'
            multiline
            rows={2}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <HomeIcon color='primary' />
                </InputAdornment>
              ),
            }}
            variant='outlined'
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ContactInformation;
