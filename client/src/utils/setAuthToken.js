import axios from 'axios';

const setAuthToken = token => {
  // ...if a token is passed to me
  if (token) {
    // applies to every request.
    // We call axios and axios will have default set of paramaters (header = key, token = value);
    axios.defaults.headers.common['Authorization'] = token;
    // common is a dictionary (key/value pair)
  } else {
    // if false we would need to delete the entire row above...
    delete axios.defaults.headers.common['Authorization']
    
  }
}

export default setAuthToken;
// now it's importable