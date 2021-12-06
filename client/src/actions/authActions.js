import { SET_USER, GET_ERRORS } from "./types"
import axios from 'axios';

//whenever someone calls this function, we will dispatch a call with 2 pieces of information - all dispatches has 2 pc of info - 1) type and 2) payload

// export const registerUser = (userData) => {
  // return {
    // type: SET_USER, // type of dispatch call (basically codeword?)


    // payload: userData // information of the dispatch call.
  // }

  // AS  soon as this call is dispatched above... the reducer in the authReducer will listen to this and trigger and write this information above into the redux Store. It's being triggered in the Register component.
// }


export const registerUser = (userData, history) => dispatch => {
  // action = you're dispatching something. Based on the response of the axios call you will dispatch either this or that.
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        // errors is global 
      }));
    // again, axios = postman = API testing
}

// if something failed with the API, we're going to use Get_Error dispatched and the payload will be the error message. We will write a second reducer that will listen for Get_errors and write the error information to the store so UI can also read the error AND  auth data both. 

// Login action
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Saving token (like when we copied Postman's token) to a local storage (browser cache)
      // Global state is Redux
      // Set the token to the auth header
      // Dispatch set_user
    })
    .catch(err => dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     }));
}