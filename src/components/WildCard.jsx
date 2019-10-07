import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import allTeams from '../utils/teams.json';
import StandingsHeader from './StandingsHeader';

function WildCard({ team }) {
  WildCard.propTypes = ({
    team: PropTypes.object.isRequired // eslint-disable-line
  });

  const sortedArray = [team[2], team[3], team[0], team[4], team[5], team[1]];

  const headerConf = (data, index) => {
    switch (index) {
      case 0:
        return (
          <div className="header-section align__left">
            Eastern
          </div>
        );
      case 3:
        return (
          <div className="header-section align__left">
            Western
          </div>
        );
      default:
        return null;
    }
  };

  const headerDiv = (ele, data, index) => {
    if (index === 0 && data.divisionRank === '1') {
      return <StandingsHeader name={ele.division.name} />;
    }
    if (ele.standingsType === 'wildCard' && index === 0) {
      return <StandingsHeader name="Wild Card" />;
    }
    if (ele.standingsType === 'wildCard' && index === 2) {
      return <StandingsHeader />;
    }
    return null;
  };

  if (!sortedArray[0]) { return (<div>loading...</div>); }

  return (
    <div>
      {sortedArray.map((ele, i) => (
        <div>
          {headerConf(ele, i)}
          {ele.teamRecords.map((teams, index) => (
            <div>
              {headerDiv(ele, teams, index)}
              <div className="twelfth-section list">
                <div className="first-element padding-small">
                  { /* eslint-disable-next-line */ }
                  {allTeams.teams.filter((id) => id.id == teams.team.id).map((logo) => (
                    <img src={logo.url} className="logo logo__small" alt="logo" />
                  ))}
                </div>
                <div className="second-element center--grid padding-small">
                  <Link className="link-remove" to={`/teams/${teams.team.id}`}>{teams.team.name}</Link>
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
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default withRouter(WildCard);
