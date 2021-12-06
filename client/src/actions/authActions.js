import { SET_USER } from "./types"
//whenever someone calls this function, we will dispatch a call with 2 pieces of information - all dispatches has 2 pc of info - 1) type and 2) payload

export const registerUser = (userData) => {
  return {
    type: SET_USER, // type of dispatch call (basically codeword?)


    payload: userData // information of the dispatch call.
  }

  // AS  soon as this call is dispatched above... the reducer in the authReducer will listen to this and trigger and write this information above into the redux Store. It's being triggered in the Register component.
}