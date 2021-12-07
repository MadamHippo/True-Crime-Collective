import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


// Here we are now connecting UI to our API (fullstack dev time!):
class Login extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value });
  }

  onSubmit(e){
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    
    this.props.loginUser(user);
  }


  // Reads the properties from the store and write the properties into your component. So if you get new data (nextProps) this function will read it, and we will push the history of it to the Dashboard. Does the new data contain isAuth's new state? if so you need to react to that new data and you will send it to the Dashboard component. 

  // we have Redux / Redux store because it's useful for keep refreshing itself even though it's already loaded on the stage. It can still react to new data - very good example is Gmail or Twitter. Somewhere on the page there needs to be a hookpoint to get the new data.

  // What are hook points (terminology)? What does common stand for? What do you mean by lifecycle?

  
  // Additional step of coming back to login to check for data and then pushing User to dashboard
  
  componentWillReceiveProps(nextProps){
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }


  render() {
    const {errors} = this.props;
    // if errors in email, these things will show up on the UI side just like what we did in Register.js
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to True Crime Collective</p>
              <form noValidate onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input type="email" className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                     placeholder="Email Address" name="email"
                     value = {this.state.email}
                    onChange={this.onChange.bind(this)}
                     />
                   {
                      <div className="invalid-feedback">
                        {errors.email}
                      </div>
                    }
                </div>
                <div className="form-group">
                  <input type="password" className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })} placeholder="Password" name="password"
                    value = {this.state.password}
                    onChange={this.onChange.bind(this)}
                     />
                    {
                      <div className="invalid-feedback">
                        {errors.password}
                      </div>
                    }
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  auth: state.auth,
  // We need the auth data for login, it contains the isAuthenticated flag of True/False
  errors: state.errors
})

export default connect(mapStatetoProps, {loginUser}) (withRouter(Login));


// Redux notes (from 2021 11 20):
// There's a lot of code neccessary to write Redux.


// The first step is creating the Store in Redux. Store = temporary state. We have to create a piece of memory somewhere to store this data as long as the browser is open. Store is saying hey create a piece of memory to store this data in the component and accessible by other components. 
// The way Redux has been built (by Facebook) at any point the store is busy writing data because they can handle just 1 request. You don't want a direct connection to the Store. yOu need....a reducer!


// Second step: write reducers for your application: So the reducer will filter down what is stored in the store. Reducers are the second step, to answer who will be responsible to write the data to the store. Which means you have to call Reducer (you can have multiple Reducers to filter down the data). Anything the data changes is called a transformation for multiple reducers: 
// For example: Auth reducer, error reducer, post reducer, profile reducer etc.
// Different reducers will different responsibilities chunked up will make the job parrallelly done so work is finished faster.
// Only reduceres can write to store. It's filtered down and transformed before going into the store.


// Actions is the third step: submit button is an example of action. Axios calls API. API sends back data or error message. The submit button will make a call from Axios...action will collect your data to be selected. Action will pass this data to reducer. Login function in the action is used to make a API call, when the API response it will be sent to the Auth reducer to the store eventually. 
// So action calls data, data responds, action sends to reducer via Dispatch (call center), reducer to write in the store 
// UI Action (in the Uber example, people who want a ride and making call to get a call). Action do not directly call Reducer. The call center (Dispatch) in Action is a dispatch that will call the Reducer.
// Action says "oh I want to write to Auth data" so Reducer will go "OK I handle auth data, so I can write it to the store"


// A reducer's Dispatch makes the data written with a dispatch call to say "I want to write auth, call Each dispatch will have a code (to cover auth dispatch or profile dispatch) so they can send it to the right reducer based on the incoming data.
// Dispatch acts like the "glue" between Action and Reducer.
// A dispatch will call themselves: authDispatch, etc. to have meaningful name so Reducers can recognize the code inside the code of the dispatch.


// Since you have broken Reducers down to different Reducers, these specific Reducers know what to do.
// Each Reducer will be responsible for different area of data, which makes the process faster.

// UI (React/Redux side) -> API -> Mongodb ... you can scale out UI / Redux based on user demand. In multiple users (lots of users), scale out multiple servers on the front end within the Redux (using a load balancer to sit in the front) so users can route diff users to different machines. 

// There are multiple Reacts, and multiple different servers in the cloud. Just one won't be able to meet demand.
// Dispatch and Auth are different components. Dispatch and auths are variables. Dispatch is like the baton in a relay race. 

// redux.js.org for docs and API: reducer, preloaded state (if you want to preload data), enchancer (can transform data). Last 2 parameteres are optional.