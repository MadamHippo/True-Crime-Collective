import { SET_USER } from "../actions/types";

// What data do I write into the store for others to use? Well we want to authenticate the user and then say hello to the user. If not we should send the user how to login. This authentication empty object needs to answer this. It's responsible for creating the initial State -
const initialState = {
  isAuthenticated: false,
  user: {}
}
// initialState is an object with two keys, isAuth and user information data. Its job is to create these two keys and then more code will follow to write these keys to the store.

// Look at redux.js for docs on how to create a Store using a function as follows: 
// it's a function that we pass in a state.
export default function(state=initialState, action){
  switch(action.type){
    case SET_USER:
          // if I see this call to set_user, then I will pick it up as I return to the state and spread the state (data) and set the user data.
          return{
            ...state,
              // return to state and make a copy of that data sent..then it will Pick apart that data...and write that data (set_user) into user:action.payload:

        // In an uber example, set_user is like hey I want to go from seattle to redmond...and the state in this example is your pick up address.
        
        // A new data will come when the user logins (they click on the user button). This action will call the API to get the token and then dispatch new data as a copy.
            user: action.payload

         // action payload is the "uber address" your dispatch call is (and in this case you want to go from seattle to redmond aka set_user) 
         

        //This section will then overwrite the initial state with the information we need.
          }


        // this is how the Reducer is signed up to recieve a request and perform a action on top of that. 
        
        // Now we will go into the authActions folder. Actions are tied to UI. We need to trigger the UI and get this action going.

    default:
      return state;
  }
}

// What's happening inside React reducers right now:
//App calls Store.js, Store calls index.js, and index calls authReducer.

// When app starts, index.js calls authReducer.js and authReducer will inject it's original initializeState as the default state when there's no other data call. It takes the default data and wrote it into the store. No dispatched data to pass to authReducer function.
