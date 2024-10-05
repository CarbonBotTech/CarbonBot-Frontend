export const parseErrors = (errors) => {
  
  if(errors && errors.data) {

    if(errors.data.message && typeof errors.data.message === 'string') {
      return [{
        id: 'generic',
        message: errors.data.message
      }];
    } else if (errors.data.message && typeof errors.data.message === 'object' && Object.keys(errors.data.message).length > 0) {

      return errors.data?.message[0]['messages'] ;
    }

  }

  return [{
    id: 'generic',
    message: 'Error! Something went wrong.'
  }];

};

export default parseErrors;
