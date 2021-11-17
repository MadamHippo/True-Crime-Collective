import React, { Component } from 'react';
import {Link} from 'react-router-dom';

// when user come to the page, they will see a navbar, and the simple footer. I want them to see my homepage (main page), then we will take the user to register component (haven't build that yet) but the middle section (landing page) will change. We will install react router here. It's like another version of express. It lets us look at the url and display the component in the same UI. It will load different components on the same middle section of the page (SPA).

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">True Crime Collective</h1>
                <p className="lead"> Real Cases. Real People. Real Connections. </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;