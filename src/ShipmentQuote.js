import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FlightIcon from '@mui/icons-material/Flight';

import AddIcon from '@mui/icons-material/Add';
import shipImage from './shipment.jpg';
import InputAdornment from '@mui/material/InputAdornment';
import SailingIcon from '@mui/icons-material/Sailing';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import PortLoading from './components/PortLoading';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomizedSteppers from './components/Stepper';
import ContactInformation from './components/ContactInformation';
import QuoteCompletion from './components/QuoteCompletion';
import FileUpload from './components/FileUpload';

import DeleteIcon from '@mui/icons-material/Delete';
import { PlusOne } from '@mui/icons-material';
import AirDetails from './components/AirDetails';
import usePortDetails from './hooks/usePortDetail';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ShipmentQuote() {
  const { response, loading } = usePortDetails('Sea');
  console.log(response);
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
      <Card sx={{ width: '90%', padding: 2 }}>
        <CustomizedSteppers activeStep={activeStep} />
        {/* <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
              <FlightIcon />
            </Avatar>
          }
          title='Shipment Information'
          subheader='November 06, 2023'
        /> */}
        <CardMedia
          style={{ marginTop: 10 }}
          component='img'
          height='194'
          image={shipImage}
          alt='Shipment Image'
        />
        <CardContent>
          {activeStep === 0 && (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='shipment Tabs'
            >
              <Tab
                icon={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='ship'>
                    <SailingIcon />
                  </Avatar>
                }
                label='Ship'
              >
                Ship Details
              </Tab>
              <Tab
                icon={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label='air'>
                    <FlightTakeoffIcon />
                  </Avatar>
                }
                label='Air'
              >
                Air Details
              </Tab>
            </Tabs>
          )}
          {activeStep === 0 && (
            <>
              <TabPanel value={value} index={0}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    onChange={() => setShowContainerType(true)}
                  >
                    <FormControlLabel
                      value='Containerized Cargo'
                      control={<Radio />}
                      label='Containerized Cargo'
                    />
                    <FormControlLabel
                      value='Oversized Cargo'
                      control={<Radio />}
                      label='Oversized Cargo'
                    />
                  </RadioGroup>
                  {showContainerType && (
                    <div style={{ marginTop: 5 }}>
                      <FormLabel
                        style={{ color: '#262424de' }}
                        id='demo-row-radio-buttons-group-label'
                      >
                        Container Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                      >
                        <FormControlLabel
                          value='spc'
                          control={<Radio />}
                          label='Special Containers'
                        />
                        <FormControlLabel
                          value='bbrr'
                          control={<Radio />}
                          label='BreakBulk / RoRo'
                        />
                      </RadioGroup>
                    </div>
                  )}
                </FormControl>
                <Grid
                  justifyContent={'space-between'}
                  flexWrap={'nowrap'}
                  container
                  spacing={2}
                >
                  <Grid item xs={3}>
                    <PortLoading label='POL' portRecords={response} />
                  </Grid>
                  <Grid item xs={3}>
                    <PortLoading label='POD' portRecords={response} />
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className='dateStyle'
                        label='Preferred Shipping Date'
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label='Commodity'
                      variant='outlined'
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label='Classification'
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      id='outlined-basic'
                      label='UN Number'
                      variant='outlined'
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
                  {showContainerType && (
                    <div style={{ marginTop: 5 }}>
                      <FormLabel
                        style={{ color: '#262424de' }}
                        id='demo-row-radio-buttons-group-label'
                      >
                        Whether the goods are DG or Non DG?
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                      >
                        <FormControlLabel
                          value='spc'
                          control={<Radio />}
                          label='Yes'
                        />
                        <FormControlLabel
                          value='bbrr'
                          control={<Radio />}
                          label='No'
                        />
                      </RadioGroup>
                    </div>
                  )}
                </div>
                <div>
                  {showContainerType && (
                    <Grid
                      justifyContent={'space-between'}
                      flexWrap={'nowrap'}
                      container
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        <div style={{ marginTop: 5 }}>
                          <FormLabel
                            style={{ color: '#262424de' }}
                            id='demo-row-radio-buttons-group-label'
                          >
                            Inco Term
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby='demo-row-radio-buttons-group-label'
                            name='row-radio-buttons-group'
                          >
                            <FormControlLabel
                              value='FOB'
                              control={<Radio />}
                              label='FOB'
                            />
                            <FormControlLabel
                              value='CIF'
                              control={<Radio />}
                              label='CIF'
                            />
                            <FormControlLabel
                              value='C&F'
                              control={<Radio />}
                              label='C&F'
                            />
                            <FormControlLabel
                              value='FCA'
                              control={<Radio />}
                              label='FCA'
                            />
                            <FormControlLabel
                              value='EXW'
                              control={<Radio />}
                              label='EXW'
                            />
                            <FormControlLabel
                              value='DAP'
                              control={<Radio />}
                              label='DAP'
                            />
                            <FormControlLabel
                              value='DDU'
                              control={<Radio />}
                              label='DDU'
                            />
                            <FormControlLabel
                              value='DDP'
                              control={<Radio />}
                              label='DDP'
                            />
                          </RadioGroup>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Delivery Address'
                          variant='outlined'
                        />
                      </Grid>
                    </Grid>
                  )}
                </div>
                <div>
                  <Button
                    style={{ marginTop: 15 }}
                    variant='contained'
                    endIcon={<AddIcon />}
                    onClick={() =>
                      setContainerCount((value) => [
                        ...value,
                        ...[value.length],
                      ])
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
                      <Grid item xs={2}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Container Type
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            label='Container Type'
                          >
                            <MenuItem value={20}>20' OT</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Quantity'
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
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Photo/Tech Drawing'
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
                      <Grid item xs={1}>
                        <IconButton
                          aria-label='delete'
                          color='primary'
                          size='large'
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AirDetails />
              </TabPanel>
            </>
          )}
          {activeStep === 1 && <ContactInformation />}
          {activeStep === 2 && <QuoteCompletion />}
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              disabled={activeStep === 0 ? true : false}
              onClick={() => setActiveStep((value) => value - 1)}
              variant='text'
            >
              Back
            </Button>
            <Button
              disabled={activeStep === 2 ? true : false}
              variant='contained'
              onClick={() => setActiveStep((value) => value + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
