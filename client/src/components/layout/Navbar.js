import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logoutUser} from '../../actions/authActions';


//Navbar is a RCC component that's smart for users. It extends Comp from React. 

class Navbar extends Component {
  
  //writing the LogoutClick function...
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
    // What we did in App.js which trigger this prop.logoutUser function and will do those same 3 things in authActions
  }
  
  render() {
    // how to check if user is authenticated with an extra variable:
    // const auth = this.props.auth;
    // if (auth.isAuthnticated)
    // or just say...give me the auth props back...doesn't matter if isAuth or not..

    const {isAuthenticated, user} = this.props.auth;

    // HTML: we have 2 variables, guest links which is current HTML unchanged. If you're not logged in this is the html we'll show. 
    //authLink is what people will see if they're logged in. So it'll show your name + image wrapped in a href ref and you can see the logout option that will call a function called onLogoutClick.
    // So each const has each HTML to tell them what to do/display.

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="You must have a gravatar connected to your email to display an image"
            />
            Logout
          </a>
        </li>
      </ul>
    );


    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">True Crime Collective</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> User Profiles
                </Link>
              </li>
            </ul>

            {isAuthenticated? authLinks : guestLinks}

          </div>
        </div>
      </nav>
    )
  }
}
// {isAuthenticated? authLinks : guestLinks} is for updating the HTML based on a condition.


Navbar.propTypes = {
  //Nav bar uses proptypes uses the logout function to exist and it will read the auth data.
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
// the auth data is important to the Navbar because we're changing the UI look depending on if user is logged in or not so that's why we need the auth data BACK from the Redux store. It has the updated user status if authenticated or not.
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);