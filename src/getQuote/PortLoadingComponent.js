import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
// import Listbox from '@mui/material/Listbox';
import CircularProgress from '@mui/material/CircularProgress';
import { FixedSizeList } from 'react-window';

const PortLoadingComponent = ({ portRecords = [] }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = async (inputValue) => {
    setLoading(true);
    // Make an API call to fetch options based on the inputValue
    // Update the options state with the fetched data
    const records = portRecords
      .filter((d) =>
        d?.label.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
      )
      .filter((d, i) => i < 50);
    setOptions(records);
    setLoading(false);
  };

  const handleInputChange = (event, newInputValue) => {
    fetchOptions(newInputValue);
  };

  useEffect(() => {
    fetchOptions('');
  }, []); // Fetch initial options

  return (
    <Autocomplete
      id='virtualization-demo'
      disableListWrap
      options={options}
      loading={loading}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField {...params} label='Search' variant='outlined' />
      )}
      renderOption={(props, option) => <li {...props}>{option.label}</li>}
      ListboxComponent={(props) => (
        <FixedSizeList height={200} width={300} itemSize={30} {...props}>
          {loading ? (
            <CircularProgress />
          ) : (
            options.map((option, index) => <li {...props}>{option.label}</li>)
          )}
        </FixedSizeList>
      )}
    />
  );
};

export default PortLoadingComponent;
