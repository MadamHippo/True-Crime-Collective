// Combines all reducer together instead of having to put it in store.js
// This file that contains all reducers will call store.js and it'll be easier and more eloquent

// The root reducer will start up both of these Reducers at App start up.

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer
});

// What redux solves: Redux easily connect your components and select those parts of the state which they need. Also, communication between components becomes much easier, instead of passing callbacks to props, your components just listed to state and represent it, any time you need to change a state just send an action. 

// Redux is some kind of event sourcing, instead of changing a state directly, so send actions (events) which describe how to modify the state and reducer applies these changes.

// Basically, redux allow you to save data into a "store" which can be accessed by all of your components