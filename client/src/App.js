// turning this into a class base component (RCC). This component extends a library with lots of built in functions.

//the order: index.js calls app.js and that's it. This is called JSX. It's a javascript extension. Javascript allows you to add HTML as part of this code which makes it extensible. Tha's how you do Single page applications which is why you have just one App.js. (CSS can be written separately but HTML and JS is mixed together in React.) JSX will have HTML embeeded in it. In Angular, all 4 components were separate for every component created...whereas React is ine one like this.

// Tell concurrently to run server, and then npm start preflix client and this will run both at the same time.

// App.js is a functional based component (dumb simple component) you use class base whenever you need it to be dynamic so we need to turn app.js to eventually a class based one:

// You write all Redux code in App.js because it's needed in Nav bar footer etc. so it's easier to write it in App.js in one place. 

import React, { Component } from 'react'
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route} from 'react-router-dom';
// Installed react router dom. wrote Router because BrowserRouter too long to type. This is what makes it load smoothly, SPA. It looks at the url and display in the same UI various componenents. We need this in the CLIENT folder, not the developer side.
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
// importing store.js and then calling the store below.
import {Provider} from 'react-redux';
// this provider will provide the location of the store and help tell the routes where the store is located. Provider is a react component
import jwt_decode from 'jwt-decode';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {SET_USER} from './actions/types';


// Logout
if (localStorage.jwtToken) {
  // checking if localStorage has a jwtToken and if it does, is it still valid under 60 min time
  const decoded = jwt_decode(localStorage.jwtToken);
  // calling function of jwt_decode and get browser's token, we're going to read it and decode it using this function and it will give me playload + expiration time of the token.
  const currentTime = Date.now()/1000;
  // gives us seconds of current time into seconds...then check IF expiration time of decoded is LESS than current time...if yes then our token has expired which means we will need to trigger logout steps.

  if (decoded.exp < currentTime) {
    // Logout - triggering logout action in authAction's code responsible for logging out.
    // App has access to the store...so just call the store because App.js and store is the beginning of everywhere and everything. So just go to the store and dispatch it from there.
    store.dispatch(logoutUser()) // logoutUser is imported in from above, this line triggers the authAction logout. 
    //Now it's time to redirect the user.

    //Is it weird the Store is dispatching a call? Well in REACT - Store and app.js starts everything so React has a ability to dispatch. It's a shortcut to having a UI hack, so without having to get an action call from UI - user is not clicking button to logout because this function will do it for you.
    
    // Since App.js running in the background always, it will trigger and dispatch the call to the Store after 60 minutes time is up. Logout code is in authActions and it will go to the Store to clean up everything.

    // The other way (with UI on top) is just having a logout Button in the Navbar physically so you can get the dispatch call yourself...

    // Redirect
    window.location.href="/login";
  }

//Refilling the user data in case Redux gets whipped out once we move away from website. But the browser state storage still has a valid token so we need to REFILL the login again so you don't have to login again.

// So we're mimicing the login action...we still have the token in the auth header so we just need to decode the token, then dispatch it to the store agin...

// Mimic login action:

   //set the token to the auth header
   setAuthToken(localStorage.jwtToken);

   //dispatch set_user will call the set_user...but we're not doing API call because we already have the token that's still valid..
   store.dispatch({
     type: SET_USER,
     payload: decoded
   }); 
}




class App extends Component {
  render() { // render is the last stage of the component, it will return the html you want to display. You can add more logic than a functional component (more than the code below)
    return (
      // Using React Router Dom here: We are wrapping it in <Router> tags because in the future we might add to it etc. Route is without the domain so if you see the / then it means load on the same component.

      // use the name "exact path" + / which helps React go OK if I see / I load main page. If I see /register then instead then load register component.
      

      // Who here below needs access to the store? Well here it says we need Landing, Register, and login in this case. It's up to you.

      //Provider is a react component, all comps below Provider, will have access to store. The store is located (as noted above in import) points to the store.js (store memory)
      
      <Provider store ={store}>
        <Router>
          <div className="App">
          <Navbar />

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          
          <Footer />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;

// RCC component