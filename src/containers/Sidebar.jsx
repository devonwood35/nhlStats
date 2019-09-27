import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../components/Button';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

function Sidebar({ loadTeams, teams }) {
  Sidebar.propTypes = ({
    loadTeams: PropTypes.func.isRequired,
    teams: PropTypes.array, // eslint-disable-line
  });

  loadTeams();

  return (
    <div className="side-container">
      {teams.map((team) => (
        <Button name={team.name} id={team.id} key={team.id} />
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