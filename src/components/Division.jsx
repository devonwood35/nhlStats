import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import allTeams from '../utils/teams.json';
import StandingsHeader from './StandingsHeader';

function Division({ team }) {
  Division.propTypes = ({
    team: PropTypes.object.isRequired // eslint-disable-line
  });

  if (!team) { return (<div>loading...</div>); }

  return (
    <div>
      {team.map((division) => (
        <div>
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
            <div className="twelfth-section list">
              <div className="first-element padding-small">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((id) => id.id == teams.team.id).map((logo) => (
                  <img src={logo.url} className="logo logo__small" alt="logo" />
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
                {teams.row}
              </div>
              <div className="ninth-element center--grid padding-small">
                {teams.goalsScored}
              </div>
              <div className="tenth-element center--grid padding-small">
                {teams.goalsAgainst}
              </div>
              <div className="eleventh-element center--grid padding-small">
                {teams.goalsScored - teams.goalsAgainst}
              </div>
              <div className="twelfth-element center--grid padding-small">
                {teams.streak
                  ? teams.streak.streakCode
                  : '0'}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default withRouter(Division);
