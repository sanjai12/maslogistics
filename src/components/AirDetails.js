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

import { packingTypes, units, incoTerms } from '../utils/DropdownJSON';

let seqNumber = 0;

const AirDetails = ({
  portState,
  loadPortDetails,
  handlePortState,
  uploadFileData,
  setPortRecord,
  deleteQuotes,
  quoteItemData,
  handleQuoteState,
}) => {
  const { response } = usePortDetails('Air');
  const [date, setDate] = React.useState(null);
  const [containerCount, setContainerCount] = React.useState([seqNumber]);
  return (
    <>
      <Grid
        justifyContent={'space-between'}
        flexWrap={'nowrap'}
        container
        spacing={2}
      >
        <Grid item xs={5.8}>
          <PortLoading
            portLabel={portState?.polName}
            id='pol'
            name='polName'
            loadPortDetails={loadPortDetails}
            label='Origin'
            origin={true}
            portRecords={response}
          />
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
            portLabel={portState?.podName}
            id='pod'
            name='podName'
            loadPortDetails={loadPortDetails}
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
              value={
                portState?.shippingDate ? dayjs(portState?.shippingDate) : null
              }
              onChange={(newValue) => {
                setPortRecord(
                  newValue ? dayjs(newValue).format('YYYY-MM-DD') : null,
                  'shippingDate'
                );
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Inco Term</InputLabel>
            <Select
              onChange={(event) => {
                setPortRecord(event.target.value, 'intoTerm');
              }}
              value={portState?.intoTerm}
              id='intoTerm'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <ViewInArIcon />
                  </InputAdornment>
                ),
              }}
              label='Inco Term'
            >
              {incoTerms.map(({ label, value }) => (
                <MenuItem value={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
            label='Commodity'
            variant='outlined'
            onChange={handlePortState}
            value={portState?.commodity}
            id='commodity'
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
        <Grid item xs={12}>
          <FormGroup aria-label='position' row>
            <FormControlLabel
              value='top'
              control={
                <Switch
                  color='primary'
                  id='dangerous'
                  checked={portState?.dangerous === 'No'}
                  onChange={(event) => {
                    setPortRecord(
                      event.target.checked ? 'No' : 'Yes',
                      'dangerous'
                    );
                  }}
                />
              }
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
      {portState.dangerous === 'Yes' && (
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
              onChange={handlePortState}
              value={portState?.classification}
              id='classification'
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
              onChange={handlePortState}
              value={portState?.unNo}
              id='unNo'
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
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  Packing Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  label='Packing Type'
                  onChange={(event) =>
                    handleQuoteState(event.target.value, 'packType', count)
                  }
                  id='packType'
                  value={quoteItemData?.[count]?.packType}
                >
                  {packingTypes.map(({ label, value }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label='No. of Pkg'
                variant='outlined'
                onChange={(event) =>
                  handleQuoteState(event.target.value, 'totalNoOfPkg', count)
                }
                id='totalNoOfPkg'
                value={quoteItemData?.[count]?.totalNoOfPkg}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                label='Gross Weight(KG)'
                variant='outlined'
                placeholder='0.00'
                onChange={(event) =>
                  handleQuoteState(event.target.value, 'netWeight', count)
                }
                id='netWeight'
                value={quoteItemData?.[count]?.netWeight}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                label='Length'
                variant='outlined'
                placeholder='0.00'
                onChange={(event) =>
                  handleQuoteState(event.target.value, 'length', count)
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
                  handleQuoteState(event.target.value, 'height', count)
                }
                id='height'
                value={quoteItemData?.[count]?.height}
              />
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Unit</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <ViewInArIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) =>
                    handleQuoteState(
                      event.target.value,
                      'measurementUnit',
                      count
                    )
                  }
                  id='measurementUnit'
                  value={quoteItemData?.[count]?.measurementUnit}
                  label='Unit'
                >
                  {units.map(({ label, value }) => (
                    <MenuItem value={value}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label='delete' color='primary' size='large'>
                <DeleteIcon onClick={() => deleteQuotes(count)} />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
};

export default AirDetails;
