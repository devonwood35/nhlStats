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
            <div>Games Played</div>
            <div>{numbers.gamesPlayed}</div>
          </div>
          <div className="second-element">
            <div>Wins</div>
            <div>{numbers.wins}</div>
          </div>
          <div className="third-element">
            <div>Losses</div>
            <div>{numbers.losses}</div>
          </div>
          <div className="fourth-element">
            <div>OT</div>
            <div>{numbers.ot}</div>
          </div>
          <div className="fifth-element">
            <div>Points</div>
            <div>{numbers.pts}</div>
          </div>
          <div className="sixth-element">
            <div>Rank</div>
            <div>{rank.pts}</div>
          </div>
        </div>
        <div className="half-section">
          <div className="tri-section half-section__first">
            <div className="first-element">
              <div>--------</div>
              <div>Goals Per Game</div>
              <div>Goals Against Per Game</div>
              <div>Shots Per Game</div>
              <div>Shots Allowed Per Game</div>
              <div>Power Play Percentage</div>
              <div>Power Play Goals</div>
            </div>
            <div className="second-element">
              <div>--------</div>
              <div>{numbers.goalsPerGame.toFixed(2)}</div>
              <div>{numbers.goalsAgainstPerGame.toFixed(2)}</div>
              <div>{numbers.shotsPerGame.toFixed(2)}</div>
              <div>{numbers.shotsAllowed.toFixed(2)}</div>
              <div>{`${numbers.powerPlayPercentage}%`}</div>
              <div>{numbers.powerPlayGoals}</div>
            </div>
            <div className="third-element">
              <div>Rank</div>
              <div>{rank.goalsPerGame}</div>
              <div>{rank.goalsAgainstPerGame}</div>
              <div>{rank.shotsPerGame}</div>
              <div>{rank.shotsAllowed}</div>
              <div>{rank.powerPlayPercentage}</div>
              <div>{rank.powerPlayGoals}</div>
            </div>
          </div>
          <div className="tri-section half-section__second">
            <div className="first-element">
              <div>--------</div>
              <div>Power Play Goals Against</div>
              <div>Penalty Kill Percentage</div>
              <div>Face Offs Taken</div>
              <div>Face Offs Won</div>
              <div>Face Offs Lost</div>
              <div>Face Off Percentage</div>
            </div>
            <div className="second-element">
              <div>--------</div>
              <div>{numbers.powerPlayGoalsAgainst}</div>
              <div>{`${numbers.penaltyKillPercentage}%`}</div>
              <div>{numbers.faceOffsTaken}</div>
              <div>{numbers.faceOffsWon}</div>
              <div>{numbers.faceOffsLost}</div>
              <div>{`${numbers.faceOffWinPercentage}%`}</div>
            </div>
            <div className="third-element">
              <div>Rank</div>
              <div>{rank.powerPlayGoalsAgainst}</div>
              <div>{rank.penaltyKillPercentage}</div>
              <div>{rank.faceOffsTaken}</div>
              <div>{rank.faceOffsWon}</div>
              <div>{rank.faceOffsLost}</div>
              <div>{rank.faceOffWinPercentage}</div>
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
