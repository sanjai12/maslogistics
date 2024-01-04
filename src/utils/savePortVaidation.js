export const validationSchema = (state) => {
  if (state.type === 'Sea') {
    return seaValidation(state);
  } else {
    return airValidation(state);
  }
};

export const seaValidation = (state) => {
  let validation = false;
  let message = '';
  if (!state.cargoType && !validation) {
    validation = true;
    message = 'Select Cargo type!';
  }
  if (!state.cargoSubType && !validation) {
    validation = true;
    message = 'Select Sub-Cargo type!';
  }
  if (!state.pol && !validation) {
    validation = true;
    message = 'Select Port Origin!';
  }
  if (!state.pod && !validation) {
    validation = true;
    message = 'Select Port Destination!';
  }
  if (!state.shippingDate && !validation) {
    validation = true;
    message = 'Enter shipping date!';
  }
  if (!state.commodity && !validation) {
    validation = true;
    message = 'Enter commodity!';
  }
  if (state.dangerous === 'Yes' && !validation) {
    if (!state.classification) {
      validation = true;
      message = 'Enter Classification!';
    }
    if (!state.unNo) {
      validation = true;
      message = 'Enter UN Number!';
    }
  }
  if (['DDU', 'DDP', 'EXW', 'DAP'].includes(state.intoTerm) && !validation) {
    if (!state.intoTermAddress) {
      validation = true;
      message = 'Enter Address!';
    }
  }
  if (state.quoteItems.length === 0 && !validation) {
    validation = true;
    message = 'Fill the quote items!';
  }
  (state.quoteItems || []).forEach((field) => {
    if (!field?.containerType && !validation) {
      validation = true;
      message = 'Select the Container Type!';
    }
    if (!field?.containerQty && !validation) {
      validation = true;
      message = 'Enter the Quantity!';
    }
  });
  return { validation, message };
};

export const airValidation = (state) => {
  let validation = false;
  let message = '';
  if (!state.pol && !validation) {
    validation = true;
    message = 'Select Port Origin!';
  }
  if (!state.pod && !validation) {
    validation = true;
    message = 'Select Port Destination!';
  }
  if (!state.shippingDate && !validation) {
    validation = true;
    message = 'Enter shipping date!';
  }
  if (!state.commodity && !validation) {
    validation = true;
    message = 'Enter commodity!';
  }
  if (state.dangerous === 'Yes' && !validation) {
    if (!state.classification) {
      validation = true;
      message = 'Enter Classification!';
    }
    if (!state.unNo) {
      validation = true;
      message = 'Enter UN Number!';
    }
  }
  if (state.quoteItems.length === 0 && !validation) {
    validation = true;
    message = 'Fill the quote items!';
  }
  (state.quoteItems || []).forEach((field) => {
    if (!field?.packType && !validation) {
      validation = true;
      message = 'Select the Package Type!';
    }
    if (!field?.totalNoOfPkg && !validation) {
      validation = true;
      message = 'Enter the no of package!';
    }
  });
  return { validation, message };
};

export const companyValidation = (state) => {
  let validation = false;
  let message = '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!state.company && !validation) {
    validation = true;
    message = 'Enter company name!';
  }
  if (!state.name && !validation) {
    validation = true;
    message = 'Enter client name!';
  }
  if (!state.country && !validation) {
    validation = true;
    message = 'Enter country!';
  }
  if (!state.email && !validation) {
    validation = true;
    message = 'Enter Email!';
  }
  if (!state.phone && !validation) {
    validation = true;
    message = 'Enter Phone!';
  }

  const isValidEmail = emailRegex.test(state.email || '');
  if (!isValidEmail && !validation) {
    validation = true;
    message = 'Enter Valid Email!';
  }

  if (!state.address && !validation) {
    validation = true;
    message = 'Enter Address!';
  }
  return { message, validation };
};

export const fileChecking = (file) => {
  let validation = false;
  let message = '';
  if (file) {
    const fileSizeInKB = file.size / 1024; // Convert bytes to kilobytes

    if (fileSizeInKB > 64) {
      validation = true;
      message = 'File size exceeds 64 KB. Please choose a smaller file.';
    }
  }
  return { validation, message };
};
