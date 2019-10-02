import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class TeamStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.runUpdate(id);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id } } } = this.props;
    if (prevProps.match.params.id !== id) {
      this.runUpdate(id);
    }
  }

  runUpdate(id) {
    api.loadTeamStats(id).then((stats) => {
      this.setState({
        teamStats: stats.data.teams[0].teamStats[0].splits
      });
    });
  }

  render() {
    const { teamStats } = this.state;
    if (!teamStats || !teamStats[0]) { return (<div>loading...</div>); }

    const numbers = teamStats[0].stat;
    const rank = teamStats[1].stat;
    return (
      <div className="list list__border-large">
        <div className="sext-section list__border-bottom">
          <div className="first-element">
            <div className="padding-small">Games Played</div>
            <div className="padding-small">{numbers.gamesPlayed}</div>
          </div>
          <div className="second-element">
            <div className="padding-small">Wins</div>
            <div className="padding-small">{numbers.wins}</div>
          </div>
          <div className="third-element">
            <div className="padding-small">Losses</div>
            <div className="padding-small">{numbers.losses}</div>
          </div>
          <div className="fourth-element">
            <div className="padding-small">OT</div>
            <div className="padding-small">{numbers.ot}</div>
          </div>
          <div className="fifth-element">
            <div className="padding-small">Points</div>
            <div className="padding-small">{numbers.pts}</div>
          </div>
          <div className="sixth-element">
            <div className="padding-small">League Rank</div>
            <div className="padding-small">{rank.pts}</div>
          </div>
        </div>
        <div className="half-section">
          <div className="tri-section tri-section__uneven half-section__first">
            <div className="first-element">
              <div className="padding-small">--------</div>
              <div className="padding-small">Goals Per Game</div>
              <div className="padding-small">Goals Against Per Game</div>
              <div className="padding-small">Shots Per Game</div>
              <div className="padding-small">Shots Allowed Per Game</div>
              <div className="padding-small">Power Play Percentage</div>
              <div className="padding-small">Power Play Goals</div>
            </div>
            <div className="second-element">
              <div className="padding-small">--------</div>
              <div className="padding-small">{numbers.goalsPerGame.toFixed(2)}</div>
              <div className="padding-small">{numbers.goalsAgainstPerGame.toFixed(2)}</div>
              <div className="padding-small">{numbers.shotsPerGame.toFixed(2)}</div>
              <div className="padding-small">{numbers.shotsAllowed.toFixed(2)}</div>
              <div className="padding-small">{`${numbers.powerPlayPercentage}%`}</div>
              <div className="padding-small">{numbers.powerPlayGoals}</div>
            </div>
            <div className="third-element">
              <div className="padding-small">League Rank</div>
              <div className="padding-small">{rank.goalsPerGame}</div>
              <div className="padding-small">{rank.goalsAgainstPerGame}</div>
              <div className="padding-small">{rank.shotsPerGame}</div>
              <div className="padding-small">{rank.shotsAllowed}</div>
              <div className="padding-small">{rank.powerPlayPercentage}</div>
              <div className="padding-small">{rank.powerPlayGoals}</div>
            </div>
          </div>
          <div className="tri-section tri-section__uneven half-section__second">
            <div className="first-element">
              <div className="padding-small">--------</div>
              <div className="padding-small">Power Play Goals Against</div>
              <div className="padding-small">Penalty Kill Percentage</div>
              <div className="padding-small">Face Offs Taken</div>
              <div className="padding-small">Face Offs Won</div>
              <div className="padding-small">Face Offs Lost</div>
              <div className="padding-small">Face Off Percentage</div>
            </div>
            <div className="second-element">
              <div className="padding-small">--------</div>
              <div className="padding-small">{numbers.powerPlayGoalsAgainst}</div>
              <div className="padding-small">{`${numbers.penaltyKillPercentage}%`}</div>
              <div className="padding-small">{numbers.faceOffsTaken}</div>
              <div className="padding-small">{numbers.faceOffsWon}</div>
              <div className="padding-small">{numbers.faceOffsLost}</div>
              <div className="padding-small">{`${numbers.faceOffWinPercentage}%`}</div>
            </div>
            <div className="third-element">
              <div className="padding-small">League Rank</div>
              <div className="padding-small">{rank.powerPlayGoalsAgainst}</div>
              <div className="padding-small">{rank.penaltyKillPercentage}</div>
              <div className="padding-small">{rank.faceOffsTaken}</div>
              <div className="padding-small">{rank.faceOffsWon}</div>
              <div className="padding-small">{rank.faceOffsLost}</div>
              <div className="padding-small">{rank.faceOffWinPercentage}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TeamStats.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(TeamStats);
