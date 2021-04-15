import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logos from '../utils/logos';

function TeamRow({ teams }) {
  TeamRow.propTypes = ({
    team: PropTypes.object.isRequired // eslint-disable-line
  });

  return (
    <div key={teams.leagueRank} className="thirteenth-section list">
      <div className="first-element padding-small">
        { /* eslint-disable-next-line */ }
        {logos.filter((id) => id.id == teams.team.id).map((logo) => (
          <img key={logo.id} src={logo.url} className="logo logo__small" alt="logo" />
        ))}
      </div>
      <div className="second-element center--grid padding-small">
        <Link className="link-remove" to={`/team/${teams.team.id}`}>{teams.team.name}</Link>
      </div>
      <div className="third-element center--grid padding-small">
        {teams.gamesPlayed}
      </div>
      <div className="fourth-element center--grid padding-small">
        {teams.leagueRecord.wins}
      </div>
      <div className="fifth-element center--grid padding-small">
        {teams.leagueRecord.losses}
      </div>
      <div className="sixth-element center--grid padding-small">
        {teams.leagueRecord.ot}
      </div>
      <div className="seventh-element center--grid padding-small">
        {teams.points}
      </div>
      <div className="eigth-element center--grid padding-small">
        {teams.pointsPercentage.toFixed(2)}
      </div>
      <div className="ninth-element center--grid padding-small">
        {teams.row}
      </div>
      <div className="tenth-element center--grid padding-small">
        {teams.goalsScored}
      </div>
      <div className="eleventh-element center--grid padding-small">
        {teams.goalsAgainst}
      </div>
      <div className="twelfth-element center--grid padding-small">
        {teams.goalsScored - teams.goalsAgainst}
      </div>
      <div className="thirteenth-element center--grid padding-small">
        {teams.streak
          ? teams.streak.streakCode
          : '0'}
      </div>
    </div>
  );
}

export default TeamRow;
