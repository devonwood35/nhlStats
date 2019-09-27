import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

function Sidebar({ loadTeams, teams }) {
  loadTeams();

  return (
    <div>
      {teams.map((team) => (
        <button className="btn__sidebar">
          {team.name}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
