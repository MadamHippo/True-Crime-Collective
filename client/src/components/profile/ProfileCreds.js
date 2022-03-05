import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const { cases, memorial } = this.props;

    const casesItems = cases.map(cases => (
      <li key={cases._id} className="list-group-item">
        <h4>{cases.victims}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{cases.from}</Moment> -
          {cases.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{cases.to}</Moment>
          )}
        </p>
        <p>
          <strong>Perps:</strong> {cases.perp}
        </p>
        <p>
          {cases.about === '' ? null : (
            <span>
              <strong>About Case: </strong> {cases.about}
            </span>
          )}
        </p>
        <p>
          {cases.living === '' ? null : (
            <span>
              <strong>Case Theories + Conclusions: </strong> {cases.living}
            </span>
          )}
        </p>
      </li>
    ));

    const memorialItems = memorial.map(memorial => (
      <li key={memorial._id} className="list-group-item">
        <h4>{memorial.victim}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{memorial.from}</Moment> -
          {memorial.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{memorial.to}</Moment>
          )}
        </p>
        <p>
          <strong>Field Of Study:</strong> {memorial.eulogy}
        </p>
        <p>
          {memorial.living === '' ? null : (
            <span>
              <strong>Living Memory: </strong> {memorial.living}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">True Crime Cases</h3>
          {casesItems.length > 0 ? (
            <ul className="list-group">{casesItems}</ul>
          ) : (
            <p className="text-center">No Cases Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Victim Memorial</h3>
          {memorialItems.length > 0 ? (
            <ul className="list-group">{memorialItems}</ul>
          ) : (
            <p className="text-center">No Memorial Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;