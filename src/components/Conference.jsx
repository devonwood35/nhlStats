import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandingsHeader from './StandingsHeader';
import TeamRow from './TeamRow';

function Conference({ team }) {
  Conference.propTypes = ({
    team: PropTypes.array.isRequired // eslint-disable-line
  });

  return (
    <div>
      {team.map((conference) => (
        <div key={conference.conference.name}>
          <div className="header-section align__left">
            {conference.conference.name}
          </div>
          <StandingsHeader />
          {conference.teamRecords.map((teams) => (
            <TeamRow teams={teams} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default withRouter(Conference);
