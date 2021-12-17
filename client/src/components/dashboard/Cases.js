import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteCase } from '../../actions/profileActions';

class Cases extends Component {
  onDeleteClick(id) {
    this.props.deleteCase(id);
  }

  render() {
    const cases = this.props.cases.map(cases => (
      <tr key={cases._id}>
        <td>{cases.victim}</td>
        <td>{cases.perp}</td>
        <td>
          <Moment format="MM/DD/YYYY">{cases.from}</Moment> -
          {cases.to === null ? (
            ' Now'
          ) : (
            <Moment format="MM/DD/YYYY">{cases.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, cases._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Cases</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Victim</th>
              <th>Perpetrator</th>
              <th>Timeline</th>
              <th />
            </tr>
            {cases}
          </thead>
        </table>
      </div>
    );
  }
}

Cases.propTypes = {
  deleteCase: PropTypes.func.isRequired
};

export default connect(null, { deleteCase })(Cases);