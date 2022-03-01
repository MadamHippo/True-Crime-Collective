// write Redux code in a common places (like app.js) to start a store. Then we'll call this file from other files.

// separating out store so this file doesn't crowd App.js

import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
// index is a special name, it default picks up index.js file name but you can still specify it
// we could have said authReducer instead of rootReducer but going through the index.js in the Reducers. Instead of having to add a new reducer, we can just create in the Reducer folder an index.js and refer to index.js so we can get all the Reducers together
import thunk from 'redux-thunk';

const middlware = [thunk];



// !! the following code is disabled because if a browser does not have redux_devtools installed it will show blank page.
// const store = createStore(
//               rootReducer, // list of all reducers
//               {},
//               compose(
//                 applyMiddleware(...middleware),
//                  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//               ));

                // compose is applying multiple enchancements in the third parameter. You can combine multi enchancements together and you need to import it from Redux in the top of this page.

//store is variable. createStore is function. Reducer is in [] it is an array bc we have more than one reducer.....actually no let's just put rootReducer instead of array because its simpler.

// when you create a store, who are all the reducers that can write data into the store. You must pre-register them.

//applyMiddleware which transforms and enchances data. What should we enchance? Thunking can help break your data down in smaller pieces and it will be written parallelly.

// ... is the spread operator that copys data and enchance that copy of the data. It doesn't impact the original form of data. It makes a copy of the new data and make enhancements on top of that new data.

// so as that data comes into the store, it will spread it aka make copy of it, and thunk will break it into smaller chunks

// the 'window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()' allows you to use this extentsion to access the data (meant for development) so when you run it non-local and you're serving real life traffic then other people could see other people's data in the store without this tool.

// State is showing what data is in your data store.

// Application started when store got called, then store called root (index.js) which initalized the authReducer and the authReducer initialized the state. 

// Store woke up authReducer and took the default data we wrote and wrote it into the store.


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
              rootReducer, // list of all reducers
              {},
              composeEnhancers(
                applyMiddleware(...middleware)
              ));

export default store;
