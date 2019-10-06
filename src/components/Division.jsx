import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import allTeams from '../utils/teams.json';

function Division({ team }) {
  Division.propTypes = ({
    team: PropTypes.object.isRequired // eslint-disable-line
  });

  return (
    <div className="twelfth-section list">
      <div className="first-element padding-small">
        { /* eslint-disable-next-line */ }
        {allTeams.teams.filter((id) => id.id == team.team.id).map((logo) => (
          <img src={logo.url} className="logo logo__small" alt="logo" />
        ))}
      </div>
      <div className="second-element center--grid padding-small">
        <Link className="link-remove" to={`/team/${team.team.id}`}>{team.team.name}</Link>
      </div>
      <div className="third-element center--grid padding-small">
        {team.gamesPlayed}
      </div>
      <div className="fourth-element center--grid padding-small">
        {team.leagueRecord.wins}
      </div>
      <div className="fifth-element center--grid padding-small">
        {team.leagueRecord.losses}
      </div>
      <div className="sixth-element center--grid padding-small">
        {team.leagueRecord.ot}
      </div>
      <div className="seventh-element center--grid padding-small">
        {team.points}
      </div>
      <div className="eigth-element center--grid padding-small">
        {team.row}
      </div>
      <div className="ninth-element center--grid padding-small">
        {team.goalsScored}
      </div>
      <div className="tenth-element center--grid padding-small">
        {team.goalsAgainst}
      </div>
      <div className="eleventh-element center--grid padding-small">
        {team.goalsScored - team.goalsAgainst}
      </div>
      <div className="twelfth-element center--grid padding-small">
        {team.streak
          ? team.streak.streakCode
          : '0'}
      </div>
    </div>
  );
}

export default withRouter(Division);
