import * as React from 'react';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import { Box, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import PortLoading from './PortLoading';
import PieChartIcon from '@mui/icons-material/PieChart';
import WarningIcon from '@mui/icons-material/Warning';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FileUpload from './FileUpload';

import DeleteIcon from '@mui/icons-material/Delete';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ArticleIcon from '@mui/icons-material/Article';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import usePortDetails from '../hooks/usePortDetail';

const AirDetails = () => {
  const { response, loading } = usePortDetails('Air');
  const [value, setValue] = React.useState(0);
  const [showContainerType, setShowContainerType] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [containerCount, setContainerCount] = React.useState([0]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
      >
        <Grid item xs={5.8}>
          <PortLoading label='Origin' origin={true} portRecords={response} />
        </Grid>
        <Grid item xs={0.6}>
          <IconButton aria-label='delete' color='primary' size='large'>
            <ConnectingAirportsIcon fontSize='inherit' />
          </IconButton>
        </Grid>
        <Grid item xs={5.8}>
          <PortLoading
            label='Destination'
            destination={true}
            portRecords={response}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        style={{ marginTop: 10 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className='dateStyle'
              label='Preferred Shipping Date'
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Inco Term'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <ArticleIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        style={{ marginTop: 10 }}
        spacing={2}
      >
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Commodity'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <ViewInArIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        style={{ marginTop: 10 }}
        spacing={2}
      >
        <Grid item xs={12}>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='top'
              control={<Switch color='primary' />}
              label='Is the goods are Non-DG?'
              labelPlacement='top'
            />
            <FormControlLabel
              value='start'
              control={<Switch color='primary' />}
              label='Is custom clearance required?'
              labelPlacement='top'
            />
            <FormControlLabel
              value='bottom'
              control={<Switch color='primary' />}
              label='Is insurance required?'
              labelPlacement='top'
            />
            <FormControlLabel
              value='end'
              control={<Switch color='primary' />}
              label='Is trucking required?'
              labelPlacement='top'
            />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        style={{ marginTop: 10 }}
        spacing={2}
      >
        <Grid item xs={3}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='Classification'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PieChartIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='UN Number'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <WarningIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id='outlined-basic'
            label='DG Decl. / MSDS / COA / Packaging Certificate if any'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FileUpload />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div>
        <Button
          style={{ marginTop: 15 }}
          variant='contained'
          endIcon={<AddIcon />}
          onClick={() =>
            setContainerCount((value) => [...value, ...[value.length]])
          }
        >
          Add New
        </Button>
        {containerCount.map((count) => (
          <Grid
            justifyContent={'space-between'}
            flexWrap={'nowrap'}
            container
            style={{ marginTop: 5 }}
            spacing={2}
          >
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Packing Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Packing Type'
                >
                  <MenuItem value={20}>20' OT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='No. of Pkg'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Gross Weight(KG)'
                variant='outlined'
                placeholder='0.00'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Length'
                variant='outlined'
                placeholder='0.00'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Width'
                variant='outlined'
                placeholder='0.00'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Height'
                variant='outlined'
                placeholder='0.00'
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                id='outlined-basic'
                label='Unit'
                variant='outlined'
                placeholder='0.00'
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label='delete' color='primary' size='large'>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
};

export default AirDetails;
