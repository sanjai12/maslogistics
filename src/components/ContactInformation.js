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

const ContactInformation = ({ portState, handlePortState }) => {
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
            id='name'
            label='Company Name'
            value={portState?.name}
            onChange={handlePortState}
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
            id='company'
            label='Client Name'
            fullWidth
            value={portState?.company}
            onChange={handlePortState}
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
            id='country'
            label='Country'
            fullWidth
            value={portState?.country}
            onChange={handlePortState}
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
            id='email'
            label='Email Address'
            fullWidth
            value={portState?.email}
            onChange={handlePortState}
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
            id='phone'
            label='Phone'
            fullWidth
            value={portState?.phone}
            onChange={handlePortState}
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
            id='address'
            label='Address'
            multiline
            rows={2}
            fullWidth
            value={portState?.address}
            onChange={handlePortState}
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
