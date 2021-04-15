import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import StandingsHeader from './StandingsHeader';
import TeamRow from './TeamRow';

function WildCard({ team }) {
  WildCard.propTypes = ({
    team: PropTypes.object.isRequired // eslint-disable-line
  });

  let sortedArray = [team[2], team[3], team[0], team[4], team[5], team[1]];

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
      return <div className="line-block" />;
    }
    return null;
  };

  if (!sortedArray[0]) {
    return (<div className="loading padding-large">loading...</div>);
  } else {
    sortedArray = sortedArray.filter(x => x !== undefined);
  }

  return (
    <div>
      {sortedArray.map((ele, i) => (
        /* eslint-disable-next-line */
        <div key={i}>
          {/*{headerConf(ele, i)}*/}
          {ele.teamRecords.map((teams, index) => (
            <div key={teams.team.id}>
              {headerDiv(ele, teams, index)}
              <TeamRow teams={teams} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default withRouter(WildCard);
