import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandingsHeader from './StandingsHeader';
import TeamRow from './TeamRow';

function League({ team }) {
  League.propTypes = ({
    team: PropTypes.array.isRequired // eslint-disable-line
  });

  return (
    <div>
      <div className="header-section align__left">League</div>
      <StandingsHeader />
      {team[0].teamRecords.map((teams) => (
        <TeamRow teams={teams} />
      ))}
    </div>
  );
}

export default withRouter(League);
