import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'; // library, a function we will call to provide the default classnames and raise errors. Names are stored in setState section of code.

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
      errors: {}
      // blank is represented in setState below in axios
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
    };

    // Library name: Axios (sort of like Postman) - make a call from the React side to the Javascript side. It's another version of http client in Angular except Axios is easier.

    axios
    .post('/api/users/register', newUser)
    .then(res => console.log(res.data))
    .catch(err => this.setState({errors: err.response.data}));
    // we're calling our *own* API that we wrote before (see User.js!). If everything is successful our user data will be returned.
    //API will perform some validation and that's our full stack development!
  }


  // render is the last function
  render() {
    const {errors} = this.state; //(before deconstruction: const errors = this.state.errors;)
    //noValidate turns off auto validate on the web side. We want to only validate using data from the API side because not all web browsers validate correctly.
    return (
      <div className="register">
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

export default Register;