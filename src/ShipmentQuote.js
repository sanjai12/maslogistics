import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import AddIcon from '@mui/icons-material/Add';
import shipImage from './assets/images/shipment.jpg';
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
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  ListSubheader,
  Snackbar,
} from '@mui/material';
import PortLoading from './getQuote/PortLoading';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomizedSteppers from './getQuote/Stepper';
import ContactInformation from './getQuote/ContactInformation';
import QuoteCompletion from './getQuote/QuoteCompletion';
import FileUpload from './getQuote/FileUpload';

import DeleteIcon from '@mui/icons-material/Delete';
import AirDetails from './getQuote/AirDetails';
import usePortDetails from './services/usePortDetail';
import useSavePortDetail from './services/useSavePortDetail';
import PortLoadingComponent from './getQuote/PortLoadingComponent';
import MuiAlert from '@mui/material/Alert';
import {
  companyValidation,
  fileChecking,
  validationSchema,
} from './utils/savePortVaidation';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

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

let seqNumber = 0;

export default function ShipmentQuote() {
  const { response } = usePortDetails('Sea');
  const { saveResponse, loading, fetchData } = useSavePortDetail();
  const [portState, setPortState] = React.useState({
    type: 'Sea',
    name: '',
    company: '',
    country: '',
    email: '',
    mobile: '',
    address: '',
    cargoType: '',
    cargoSubType: '',
    pol: '',
    polName: '',
    pod: '',
    podName: '',
    shippingDate: '',
    commodity: '',
    dangerous: 'No',
    classification: '',
    unNo: '',
    msdsFile: null,
    intoTerm: 'FOB',
    intoTermAddress: '',
    totalCbm: '',
    quoteItems: [],
  });
  const [quoteItemData, setQuoteItemData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [showContainerType, setShowContainerType] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [containerCount, setContainerCount] = React.useState([seqNumber]);
  const [notification, setNotification] = React.useState({
    open: false,
    message: '',
  });
  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setPortState((oldState) => ({
        ...oldState,
        type: 'Air',
      }));
    } else {
      setPortState((oldState) => ({
        ...oldState,
        type: 'Sea',
      }));
    }
    setValue(newValue);
  };

  const handleQuoteState = (value, id, index) => {
    let quoteItems = [...quoteItemData];
    if (!quoteItems[index]) {
      quoteItems[index] = {};
      quoteItems[index].uniqueKey = index;
    }
    quoteItems[index][id] = value;
    setQuoteItemData(quoteItems);
  };

  const handlePortState = (event) => {
    setPortState((oldState) => ({
      ...oldState,
      [event.target.id]: event.target.value,
    }));
  };

  const loadPortDetails = (value, id, name) => {
    setPortState((oldState) => ({
      ...oldState,
      [id]: value?.id || '',
      [name]: value?.packingName || '',
    }));
  };

  const uploadFileData = (event, id) => {
    if (!event.target.files) {
      return;
    }
    const { validation, message } = fileChecking(event.target.files[0]);
    if (validation) {
      setNotification({
        open: true,
        message: message,
      });
    } else {
      setPortState((oldState) => ({
        ...oldState,
        [id]: event.target.files[0],
      }));
    }
  };

  const uploadQuoteFileData = (event, id, index) => {
    if (!event.target.files) {
      return;
    }
    const { validation, message } = fileChecking(event.target.files[0]);
    if (validation) {
      setNotification({
        open: true,
        message: message,
      });
    } else {
      let quoteItems = [...quoteItemData];
      if (!quoteItems[index]) {
        quoteItems[index] = {};
        quoteItems[index].uniqueKey = index;
      }
      quoteItems[index][id] = event.target.files[0];
      setQuoteItemData(quoteItems);
    }
  };

  const deleteQuotes = (id) => {
    if (quoteItemData.length > 1) {
      let quoteItems = [...quoteItemData].filter(
        (value) => value.uniqueKey !== id
      );
      setContainerCount(containerCount.filter((d) => d !== id));
      setQuoteItemData(quoteItems);
    } else {
      setNotification({
        open: true,
        message: 'Atleast one quote items should be there.',
      });
    }
  };

  const setPortRecord = (newValue, id) => {
    setPortState((oldValues) => ({
      ...oldValues,
      [id]: newValue,
    }));
  };

  const savePortRecord = async () => {
    const portData = { ...portState };
    const formData = new FormData();
    formData.append('msdsFile', portData.msdsFile ? portData.msdsFile : null);
    quoteItemData.forEach((data, index) => {
      formData.append(
        `drawingFile${index}`,
        data?.drawingFile ? data.drawingFile : null
      );
    });
    delete portData['msdsFile'];
    let quoteItems = [...quoteItemData].map((record) => {
      let result = { ...record };
      delete result['drawingFile'];
      return result;
    });
    portData.quoteItems = quoteItems;
    formData.append(
      'jsonBodyData',
      new Blob([JSON.stringify(portData)], {
        type: 'application/json',
      })
    );
    await fetchData(formData);
  };
  const [activeStep, setActiveStep] = React.useState(0);

  return (
    <>
      <Card sx={{ width: '90%', padding: 2 }}>
        <CustomizedSteppers activeStep={activeStep} />
        {/* <CardMedia
          style={{ marginTop: 10 }}
          component='img'
          height='194'
          image={shipImage}
          alt='Shipment Image'
        /> */}
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
                    id='cargoType'
                    value={portState.cargoType}
                    onChange={(event) => {
                      setPortState((oldValues) => ({
                        ...oldValues,
                        cargoType: event.target.value,
                        cargoSubType: '',
                      }));
                      setShowContainerType(true);
                    }}
                  >
                    <FormControlLabel
                      value='Containerized'
                      control={<Radio />}
                      label='Containerized Cargo'
                    />
                    <FormControlLabel
                      value='Oversized'
                      control={<Radio />}
                      label='Oversized Cargo'
                    />
                  </RadioGroup>
                  {showContainerType && (
                    <div style={{ marginTop: 5 }}>
                      <FormLabel
                        style={{ color: '#262424de' }}
                        id='cargoSubType'
                      >
                        Container Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby='demo-row-radio-buttons-group-label'
                        name='row-radio-buttons-group'
                        id='cargoSubType'
                        value={portState.cargoSubType}
                        onChange={(event) => {
                          setPortState((oldValues) => ({
                            ...oldValues,
                            cargoSubType: event.target.value,
                          }));
                        }}
                      >
                        <FormControlLabel
                          value={
                            portState.cargoType === 'Containerized'
                              ? 'FCL'
                              : 'Special'
                          }
                          control={<Radio />}
                          label={
                            portState.cargoType === 'Containerized'
                              ? 'Full Container Load [FCL]'
                              : 'Special Containers'
                          }
                        />
                        <FormControlLabel
                          value={
                            portState.cargoType === 'Containerized'
                              ? 'LCL'
                              : 'BreakBulk / RoRo'
                          }
                          control={<Radio />}
                          label={
                            portState.cargoType === 'Containerized'
                              ? 'Less Container Load [LCL]'
                              : 'BreakBulk / RoRo'
                          }
                        />
                      </RadioGroup>
                    </div>
                  )}
                </FormControl>
                <Grid
                  justifyContent={'space-between'}
                  flexWrap={'nowrap'}
                  container
                  style={{ marginTop: 5 }}
                  spacing={2}
                >
                  <Grid item xs={3}>
                    <PortLoading
                      label='POL'
                      portRecords={response}
                      portLabel={portState?.polName}
                      id='pol'
                      name='polName'
                      loadPortDetails={loadPortDetails}
                    />
                    {/* <PortLoadingComponent portRecords={response} /> */}
                  </Grid>
                  <Grid item xs={3}>
                    <PortLoading
                      label='POD'
                      portRecords={response}
                      portLabel={portState?.podName}
                      id='pod'
                      name='podName'
                      loadPortDetails={loadPortDetails}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className='dateStyle'
                        style={{minWidth:"100%"}}
                        label='Preferred Shipping Date'
                        value={date}
                        onChange={(newValue) => {
                          setPortRecord(
                            newValue
                              ? dayjs(newValue).format('YYYY-MM-DD')
                              : null,
                            'shippingDate'
                          );
                          setDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      onChange={handlePortState}
                      id='commodity'
                      value={portState.commodity}
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
                        onChange={(event) => {
                          setPortState((oldValues) => ({
                            ...oldValues,
                            dangerous: event.target.value,
                          }));
                        }}
                        id='dangerous'
                        value={portState.dangerous}
                      >
                        <FormControlLabel
                          value='Yes'
                          control={<Radio />}
                          label='Yes'
                        />
                        <FormControlLabel
                          value='No'
                          control={<Radio />}
                          label='No'
                        />
                      </RadioGroup>
                    </div>
                  )}
                </div>
                <div>
                  {portState?.dangerous === 'Yes' && (
                    <Grid
                      justifyContent={'space-between'}
                      flexWrap={'nowrap'}
                      container
                      style={{ marginTop: 5 }}
                      spacing={2}
                    >
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          onChange={handlePortState}
                          id='classification'
                          value={portState.classification}
                          label='Classification'
                          variant='outlined'
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          onChange={handlePortState}
                          id='unNo'
                          value={portState.unNo}
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
                                <FileUpload
                                  id='msdsFile'
                                  uploadFileData={uploadFileData}
                                  fileData={portState?.msdsFile}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  )}
                </div>
                <div>
                  {showContainerType && (
                    <Grid
                      justifyContent={'space-between'}
                      flexWrap={'nowrap'}
                      style={{ marginTop: 5 }}
                      container
                      spacing={2}
                    >
                      <Grid item xs={6}>
                        <div>
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
                            onChange={(event) => {
                              setPortState((oldValues) => ({
                                ...oldValues,
                                intoTerm: event.target.value,
                              }));
                            }}
                            id='intoTerm'
                            value={portState.intoTerm}
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
                          style={{
                            marginTop: 10,
                            visibility: ['DDU', 'DDP', 'EXW', 'DAP'].includes(
                              portState.intoTerm
                            )
                              ? 'visible'
                              : 'hidden',
                          }}
                          fullWidth
                          label={
                            portState.intoTerm === 'EXW'
                              ? 'Pickup Address'
                              : 'Delivery Address'
                          }
                          variant='outlined'
                          onChange={handlePortState}
                          id='intoTermAddress'
                          value={portState.intoTermAddress}
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
                      setContainerCount((value) => [...value, ...[++seqNumber]])
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
                            label='Container Type'
                            onChange={(event) =>
                              handleQuoteState(
                                event.target.value,
                                'containerType',
                                count
                              )
                            }
                            id='containerType'
                            value={quoteItemData?.[count]?.containerType}
                          >
                            <ListSubheader>
                              General Purpose Container
                            </ListSubheader>
                            <MenuItem value={'gp_20'}>20' GP</MenuItem>
                            <MenuItem value={'hc_40'}>40' HC</MenuItem>
                            <ListSubheader>
                              ODD Size Container (In Gauge Only)
                            </ListSubheader>
                            <MenuItem value={'ot_20'}>20' OT</MenuItem>
                            <MenuItem value={'ot_40'}>40' OT</MenuItem>
                            <MenuItem value={'fr_20'}>20' FR</MenuItem>
                            <MenuItem value={'fr_40'}>40' FR HC</MenuItem>
                            <MenuItem value={'fr_col_20'}>
                              20' FR Coll.
                            </MenuItem>
                            <MenuItem value={'fr_col_40'}>
                              40' FR Coll.
                            </MenuItem>
                            <ListSubheader>REEFER Container</ListSubheader>
                            <MenuItem value={'rf_20'}>20' RF</MenuItem>
                            <MenuItem value={'rf_40'}>40' RF</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          label='Quantity'
                          variant='outlined'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'containerQty',
                              count
                            )
                          }
                          id='containerQty'
                          value={quoteItemData?.[count]?.containerQty}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          fullWidth
                          label='Gross Weight(KG)'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'grossWeight',
                              count
                            )
                          }
                          id='grossWeight'
                          value={quoteItemData?.[count]?.grossWeight}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          label='Length'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'length',
                              count
                            )
                          }
                          id='length'
                          value={quoteItemData?.[count]?.length}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          label='Width'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(event.target.value, 'width', count)
                          }
                          id='width'
                          value={quoteItemData?.[count]?.width}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          label='Height'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'height',
                              count
                            )
                          }
                          id='height'
                          value={quoteItemData?.[count]?.height}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          label='Unit'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'measurementUnit',
                              count
                            )
                          }
                          id='measurementUnit'
                          value={quoteItemData?.[count]?.measurementUnit}
                        />
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          id='outlined-basic'
                          label='Photo/Tech Drawing'
                          variant='outlined'
                          style={{
                            visibility:
                              portState.cargoType === 'Oversized'
                                ? 'visible'
                                : 'hidden',
                          }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <FileUpload
                                  id='drawingFile'
                                  index={count}
                                  uploadFileData={uploadQuoteFileData}
                                />
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
                          onClick={() => deleteQuotes(count)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AirDetails
                  portState={portState}
                  loadPortDetails={loadPortDetails}
                  handlePortState={handlePortState}
                  uploadFileData={uploadFileData}
                  setPortRecord={setPortRecord}
                  deleteQuotes={deleteQuotes}
                  quoteItemData={quoteItemData}
                  handleQuoteState={handleQuoteState}
                />
              </TabPanel>
            </>
          )}
          {activeStep === 1 && (
            <ContactInformation
              portState={portState}
              handlePortState={handlePortState}
            />
          )}
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
              onClick={() => {
                if (activeStep === 0) {
                  const portChecking = { ...portState };
                  portChecking.quoteItems = [...quoteItemData];
                  const { validation, message } =
                    validationSchema(portChecking);
                  if (validation) {
                    setNotification({
                      open: true,
                      message: message,
                    });
                  } else {
                    setActiveStep((value) => value + 1);
                  }
                } else if (activeStep === 1) {
                  const portChecking = { ...portState };
                  const { validation, message } =
                    companyValidation(portChecking);
                  if (validation) {
                    setNotification({
                      open: true,
                      message: message,
                    });
                  } else {
                    savePortRecord();
                    setActiveStep((value) => value + 1);
                  }
                }
              }}
            >
              {activeStep === 1 ? 'Save Port' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification({ open: false, message: '' })}
      >
        <Alert severity='warning' sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
