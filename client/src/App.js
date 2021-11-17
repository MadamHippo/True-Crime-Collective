// turning this into a class base component (RCC). This component extends a library with lots of built in functions.

import React, { Component } from 'react'
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// Installed react router dom. wrote Router because BrowserRouter too long to type. This is what makes it load smoothly, SPA. It looks at the url and display in the same UI various componenents. We need this in the CLIENT folder, not the developer side.
import Login from './components/auth/Login';
import Register from './components/auth/Register';



class App extends Component {
  render() { // render is the last stage of the component, it will return the html you want to display. You can add more logic than a functional component (more than the code below)
    return (
      // Using React Router Dom here: We are wrapping it in <Router> tags because in the future we might add to it etc. Route is without the domain so if you see the / then it means load on the same component.

      // use the name "exact path" + / which helps React go OK if I see / I load main page. If I see /register then instead then load register component.

      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;

// RCC component
