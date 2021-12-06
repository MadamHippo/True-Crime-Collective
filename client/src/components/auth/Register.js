import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'; // library, a function we will call to provide the default classnames and raise errors. Names are stored in setState section of code.
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


//Summary of what's going to happen here:
// Calling API and putting data into the API in this entire section!
// "State" or state information means data in this context, data in component etc. There's different ways to store states.
// We're binding this data.
// Component state: we're storing the data state of the component within the component itself. ie main middle page (login + auth)
// Application state: data is stored in the entire application (navbar + footer)
// Browser state: TBD

class Register extends Component {
  constructor() {
    //constructor automatically gets called first, it's the first function that gets called by App.js. Job of constructor is to allocate space for the component below (during construction)
    super(); 
    // Component = parent; Register = child;

    // this is our component state, we can store whatever we want here! This will make sense why we have a state here when we get into Redux.
    // What we will want to store in this is all the information coming in (names email etc.)
    // In this component, we now bind a text box and BIND it together in the state.
    // We bind in the HTML below under <form action>

    // One way binding: create a variable called value and we bind it to the information it's asking for in the box (name, etc.) so we can read the data.

    

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      // you can see this in the html below in the render section
    }
  }

// Two way binding: adding onChange = {} where we add a function, onchange will get fired whenever a change is detected in the text box. Whenever a change happens, call this function onChange where you will get data. In this function you call the setState value. Using this function you will get the new text box's value.

// You can test two way binding is working because you installed two Chrome extensions (use F12 key to open dev window). React dev tools plugin will show you routes and you can see the State. It's really good for debugging! You can watch live what's happening with the onChange function below.

  onChange(e){ // read the onChange value and write it into this.state
    this.setState({[e.target.name]: e.target.value });
    // this function will figure out the respective key for each form
  }

  onSubmit(e){
    // preventing the default action of the form button:
    e.preventDefault();
    // with this button we can stop sending users to another page because this is a single page application.
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
      // submit button will call API when onSubmit is pressed (another function)
    };

    // Library name: Axios (sort of like Postman) - make a call from the React side to the Javascript side. It's another version of http client in Angular except Axios is easier.

    this.props.registerUser(newUser, this.props.history);

    // axios use to be here but onSubmit in practice shouldn't have to work hard or lift a finger so we removed axios.

    // we're calling our *own* API that we wrote before (see User.js!). If everything is successful our user data will be returned.
    //API will perform some validation and that's our full stack development!
  }


  // render is the last function
  render() {
    const {errors} = this.props; //(before deconstruction: const errors = this.state.errors;)
    //noValidate turns off auto validate on the web side. We want to only validate using data from the API side because not all web browsers validate correctly.
    const {user} = this.props.auth;

    
    
  //noValidate turns off auto validate on the web side. We want to only validate using data from the API side because not all web browsers validate correctly.

    //browsers actually have built in noValidate. We don't want browser doing that because they are NOT reliable. Not all browsers have it. You should turn off validation feature and use our API data.

    return (

      <div className="register">

      {user? user.name : "no user"}

      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your True Crime Collective account</p>

            <form noValidate onSubmit={this.onSubmit.bind(this)}>
              
              <div className="form-group">

                <input type="text"
                 className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.name
                })} // is-invalid style applied will make the text box red. This style should be applied to textbox ONLY if there is an error. Which means we make an API call and if API error trigger name field then we will know.
                placeholder="Name"
                name="name"
                value = {this.state.name} // binding name to the value of the textbox, one way binding without onChange
                onChange={this.onChange.bind(this)} // this fires at the instant something is typed into the input box which goes up to onChange(e) and writes it to the name key of the state.

                // below of invalid-feedback, from boostrap, is a styling for displaying errors. We're validating in a div and binding it to .name. So we can display a feedback for users to see what they did wrong. 
                />
        
                {
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                }
                
              </div>
              <div className="form-group">
                <input 
                type="email" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.email
                })}
                placeholder="Email Address" 
                name="email"
                value = {this.state.email}
                onChange={this.onChange.bind(this)}/>

                <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  }               
              </div>
              <div className="form-group">
                <input 
                type="password"
                className={classnames('form-control form-control-lg', {'is-invalid': errors.password
                })} 
                placeholder="Password"
                name="password"
                value = {this.state.password}
                onChange={this.onChange.bind(this)}
                />

                {
                  <div className="invalid-feedback">
                    {errors.password}
                  </div>
                }         

              </div>
              <div className="form-group">
                <input
                type="password" 
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.password2
                })} 
                placeholder="Confirm Password"
                name="password2"
                  value = {this.state.password2}
                  onChange={this.onChange.bind(this)}
                  />
                  {
                    <div className="invalid-feedback">
                      {errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
// register proptypes needs all these dependenies to come alive. Need all these actions.

const mapStatetoProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
  // we get all the data from state and this function lets us pick n' choose what exact data from state we want. In this one, we want auth.
  // basically it says...take this data from the state, write it to my local property of auth and we can write it on the page.

  // But "good" efficient and reliable pages made with React need to cover if something ever failed. If it fails, registering won't matter so in order to prepare for fails - we use "prop types" on the component that says unless these things are ready to ready, ready to go, don't load this component. Therefore this action becomes a dependency, actions are nothing but Javascript, it the action failed to load then don't show the component at all.

export default connect(mapStatetoProps, {registerUser}) (withRouter(Register));
//this component is connected to the Redux store
// registerUser is the first to connect to the Redux store.


// (withRouter(Register)) is moving the User away from the Register component (to go to Login page usually) We had to import withRouter for this.