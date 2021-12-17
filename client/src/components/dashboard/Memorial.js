import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteMemorial } from '../../actions/profileActions';

class Memorial extends Component {
  onDeleteClick(id) {
    this.props.deleteMemorial(id);
  }

  render() {
    const memorial = this.props.memorial.map(memorial => (
      <tr key={memorial._id}>
        <td>{memorial.victim}</td>
        <td>{memorial.eulogy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{memorial.from}</Moment> -
          {memorial.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{memorial.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, memorial._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Memorial</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Victim</th>
              <th>Eulogy</th>
              <th>Years</th>
              <th />
            </tr>
            {memorial}
          </thead>
        </table>
      </div>
    );
  }
}

Memorial.propTypes = {
  deleteMemorial: PropTypes.func.isRequired
};

export default connect(null, { deleteMemorial })(Memorial);