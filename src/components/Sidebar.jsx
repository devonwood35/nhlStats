import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

function Sidebar({ loadTeams, teams, history }) {
  Sidebar.propTypes = ({
    loadTeams: PropTypes.func.isRequired,
    teams: PropTypes.array, // eslint-disable-line
    history: PropTypes.object.isRequired // eslint-disable-line
  });

  loadTeams();

  function pushHistory(event) {
    const teamId = event.target.getAttribute('value');
    history.push(`/team/${teamId}`);
  }

  return (
    <div>
      {teams.map((team) => (
        <button className="btn__sidebar" key={team.id} onClick={pushHistory} type="button" value={team.id}>
          {team.name}
        </button>
      ))}
    </div>
  );
}

Sidebar.defaultProps = {
  teams: []
};

const mapStateToProps = (state) => ({
  ...state.api
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
