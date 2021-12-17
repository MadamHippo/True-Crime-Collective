import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCases } from '../../actions/profileActions';

//Exp = cases.

class AddCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perp: '',
      victim: '',
      about: '',
      from: '',
      to: '',
      active_case: false,
      theories: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const caseData = {
      perp: this.state.perp,
      victim: this.state.victim,
      about: this.state.about,
      from: this.state.from,
      to: this.state.to,
      active_case: this.state.active_case,
      theories: this.state.theories
    };

    this.props.addCases(caseData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      active_case: !this.state.active_case
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-cases">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Cases</h1>
              <p className="lead text-center">
                Add your personal favorite or most impactful true crime case that you have heard of or is currently following.
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Perps"
                  name="perp"
                  value={this.state.perp}
                  onChange={this.onChange}
                  error={errors.perp}
                />
                <TextFieldGroup
                  placeholder="* Victims"
                  name="victim"
                  value={this.state.victim}
                  onChange={this.onChange}
                  error={errors.victim}
                />
                <TextFieldGroup
                  placeholder="About"
                  name="about"
                  value={this.state.about}
                  onChange={this.onChange}
                  error={errors.about}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? 'disabled' : ''}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="active_case"
                    value={this.state.active_case}
                    checked={this.state.active_case}
                    onChange={this.onCheck}
                    id="active_case"
                  />
                  <label htmlFor="active_case" className="form-check-label">
                    Ongoing Case?
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Theories"
                  name="theories"
                  value={this.state.theories}
                  onChange={this.onChange}
                  error={errors.theories}
                  info="Tell us how this case ended or any on-going fan theories if it's unsolved."
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCases.propTypes = {
  addCases: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addCases })(
  withRouter(AddCases)
);