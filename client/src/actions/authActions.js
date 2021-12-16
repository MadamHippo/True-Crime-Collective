import { SET_USER, GET_ERRORS } from "./types"
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';

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
export const loginUser =  (userData, history) => dispatch => {
  // dispatch inhereited the userData and history parameters of loginUser
  axios
  // make axios call and send a token, if successful, we will save the token somewhere and write it into the authorization header. (Like in Postman where there's a header section except now we want to do it automatically using code instead of manually like what we did before)
    .post('/api/users/login', userData)
    .then(res => {
      // Saving token (like when we copied Postman's token) to a local storage (browser cache)
      const {token} = res.data;
      // the token is User's information encryped, so we need to decrypt it and send it to the Redux store to  be used elsewhre.

      localStorage.setItem('jwtToken', token);
      // local is actually a dictionary (key/value pair) = key is jwtToken, value is Token. This is how we write our token into the local Storage. This is the third type of storage: browser cache. See how simple it is to write into storage!

      //Browser cache is global, just like Redux (global state). LocalState = data only available within the component.
      
      // As long as the browser window is open, and you move to a different domain you can still come back and see it. It's more global. In Browser state, you move away and come back, there's still information/data so DON'T put personal information. You can put token in there, because tokens are encrypted. Those are the infos going into the Browser cache. Local storage is meant to be clear. 

      // Local storage is suppose to be simple/clean data storage.

      // In Redux, it starts fresh when you move away to a new website and come back. Redux is for complicated data storage. Redux is more temporary, if you move to a different website and come back it will wipe out.

      // Browser storage is more persistent. Yo have to clear cache or clear browser storage to delete it. 
      // Global state is Redux

      // Set the token to the auth header: need axios to make the call for us...like hey carry this token with you:

      setAuthToken(token);

      // see Utils folder for setAuthToken (we made it more reusuable and neat by putting it under Utils)
      
      // Now time to decode the token

      const decoded = jwt_decode(token);

      // Dispatch set_user

      dispatch({
        type: SET_USER,
        payload: decoded
      })
      // This will be written to the Redux store.

    })
    .catch(err => dispatch({
       type: GET_ERRORS,
       payload: err.response.data
     }));
}



//Log Out user: (no parameteres needed)...opposite of login. In login we saved token to storage, set token to authHeader, then set data into the Redux store. Now we do the opposite which is remove token from localstorage and auth header, then clean the redux store.
// Redux requires action to always dispatch something. We can do multiple dispatch calls, so the idea is we can wrap the entire funciton in a dispatch call like with dispatch below.

export const logoutUser = () => dispatch => {

  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove token from auth header (calls will fail)
  setAuthToken(false);
  // see utils > setAuthToken for why we have it switched to false (if it's false it will trigger deletion.)
  //Clean the redux store
  dispatch({
    type: SET_USER,
    payload: {}
  // See the reducer -> authReducer.js what why this cleans up the data from the redux store
  });
}