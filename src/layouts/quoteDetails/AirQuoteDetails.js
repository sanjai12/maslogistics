import {useEffect, useState} from 'react';
import { units } from 'utils/DropdownJSON';
import { Alert, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListSubheader, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { packingTypes } from 'utils/DropdownJSON';


let seqNumber = 0;

const AirQuoteDetails = ({quoteItems,loadAmountDetails}) => {

  const [containerCount,setContainerCount] = useState([seqNumber]);
  const [quoteItemData, setQuoteItemData] = useState([]);

  const handleQuoteState = (value, id, index) => {
    let quoteItems = [...quoteItemData];
    if (!quoteItems[index]) {
      quoteItems[index] = {};
      quoteItems[index].uniqueKey = index;
    }
    quoteItems[index][id] = value;
    setQuoteItemData(quoteItems);
  };

  useEffect(()=>{
    if(quoteItemData && quoteItemData.length){
      let amount = 0;
      quoteItemData.forEach((data)=>{
        amount=amount+(data.amount?Number(data.amount):0);
        amount=(data.tax?(((data.tax)/100)*amount):0)+amount;
      })
      loadAmountDetails(amount);
    }
  },[quoteItemData])


  useEffect(()=>{
    if(quoteItems && quoteItems.length){
      setQuoteItemData(quoteItems);
    }
  },[quoteItems])

    return (
        <div>
        
        {quoteItemData.map((data,count) => (
          <Grid
            justifyContent={'space-between'}
            flexWrap={'nowrap'}
            container
            style={{ marginTop: 5 }}
            spacing={0}
          >
            <Grid item xs={2}>
                <TextField
                  fullWidth
                  labelId='demo-simple-select-label'
                  label='Packing Type'
                  id='packType'
                  value={quoteItemData?.[count]?.packType}
                />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                label='No'
                variant='outlined'
                id='totalNoOfPkg'
                value={quoteItemData?.[count]?.totalNoOfPkg}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                label='Weight'
                variant='outlined'
                placeholder='0.00'
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
                id='height'
                value={quoteItemData?.[count]?.height}
              />
            </Grid>
            <Grid item xs={1}>
                <TextField
                  fullWidth
                  labelId='demo-simple-select-label'
                  id='measurementUnit'
                  value={quoteItemData?.[count]?.measurementUnit}
                  label='Unit'
                />
            </Grid>
            <Grid item xs={2}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Amount(INR)'
                          variant='outlined'
                          placeholder='0.00'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'amount',
                              count
                            )
                          }
                          id='amount'
                          value={quoteItemData?.[count]?.amount}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Tax %'
                          variant='outlined'
                          onChange={(event) =>
                            handleQuoteState(
                              event.target.value,
                              'tax',
                              count
                            )
                          }
                          id='measurementUnit'
                          value={quoteItemData?.[count]?.tax}
                        />
                      </Grid>
          </Grid>
        ))}
      </div>
    )
};


export default AirQuoteDetails;