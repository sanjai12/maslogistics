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
import shipImage from './shipment.jpg';
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

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomizedSteppers from './components/Stepper';
import ContactInformation from './components/ContactInformation';
import QuoteCompletion from './components/QuoteCompletion';

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
  const [value, setValue] = React.useState(0);
  const [showContainerType, setShowContainerType] = React.useState(false);
  const [date, setDate] = React.useState(null);
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
                    <PortLoading label='POL' />
                  </Grid>
                  <Grid item xs={3}>
                    <PortLoading label='POD' />
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                Air Details
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
