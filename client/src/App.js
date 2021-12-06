// turning this into a class base component (RCC). This component extends a library with lots of built in functions.

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