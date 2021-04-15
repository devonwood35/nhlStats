import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandingsHeader from './StandingsHeader';
import TeamRow from './TeamRow';

function Division({ team }) {
  Division.propTypes = ({
    team: PropTypes.array.isRequired // eslint-disable-line
  });

  if (!team) { return (<div className="loading padding-large">loading...</div>); }

  return (
    <div>
      {team.map((division) => (
        <div key={division.division.name}>
          {division.division.name === 'Metropolitan'
            ? (
              <div className="header-section align__left">
                {division.conference.name}
              </div>
            )
            : null}
          {division.division.name === 'Central'
            ? (
              <div className="header-section align__left">
                {division.conference.name}
              </div>
            )
            : null}
          <StandingsHeader name={division.division.name} />
          {division.teamRecords.map((teams) => (
            <TeamRow teams={teams} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default withRouter(Division);
