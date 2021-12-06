import { GET_ERRORS } from "../actions/types";

const initialState = {

};

// initialState is nothing and empty because errors can't come by default. 

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
  switch(action.type){
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
      // This is the initial state, first state, first dispatch call...all these Reducers write in the initial state no matter if it's broken or no.


    // since there's nothing to copy, no need to spread like what we did in authReducer.js.
    // all needs be is to return the option in a payload.

    // Bonus homework: how to clear the error reducer message to the original, initial errorless State?
    

  }
}
// action contains the type of the dispatch call AND payload.
