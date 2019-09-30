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
      <div className="list">
        <div className="quint-section">
          <div className="half-section half-section__first">
            <div className="first-element">
              {numbers.gamesPlayed}
            </div>
          </div>
          <div className="half-section half-section__second">
            <div className="first-element">
              {numbers.wins}
            </div>
            <div className="second-element">
              {rank.wins}
            </div>
          </div>
          <div className="half-section half-section__third">
            <div className="first-element">
              {numbers.losses}
            </div>
            <div className="second-element">
              {rank.losses}
            </div>
          </div>
          <div className="half-section half-section__fourth">
            <div className="first-element">
              {numbers.ot}
            </div>
            <div className="second-element">
              {rank.ot}
            </div>
          </div>
          <div className="half-section half-section__fifth">
            <div className="first-element">
              {numbers.pts}
            </div>
            <div className="second-element">
              {rank.pts}
            </div>
          </div>
        </div>
        <div className="quad-section">
          <div className="half-section half-section__first">
            <div className="first-element">
              {numbers.goalsPerGame.toFixed(2)}
            </div>
            <div className="second-element">
              {rank.goalsPerGame}
            </div>
          </div>
          <div className="half-section half-section__second">
            <div className="first-element">
              {numbers.goalsAgainstPerGame.toFixed(2)}
            </div>
            <div className="second-element">
              {rank.goalsAgainstPerGame}
            </div>
          </div>
          <div className="half-section half-section__third">
            <div className="first-element">
              {numbers.shotsPerGame.toFixed(2)}
            </div>
            <div className="second-element">
              {rank.shotsPerGame}
            </div>
          </div>
          <div className="half-section half-section__fourth">
            <div className="first-element">
              {numbers.shotsAllowed.toFixed(2)}
            </div>
            <div className="second-element">
              {rank.shotsAllowed}
            </div>
          </div>
        </div>
        <div className="quad-section">
          <div className="half-section half-section__first">
            <div className="first-element">
              {numbers.powerPlayPercentage}
            </div>
            <div className="second-element">
              {rank.powerPlayPercentage}
            </div>
          </div>
          <div className="half-section half-section__second">
            <div className="first-element">
              {numbers.powerPlayGoals}
            </div>
            <div className="second-element">
              {rank.powerPlayGoals}
            </div>
          </div>
          <div className="half-section half-section__third">
            <div className="first-element">
              {numbers.powerPlayGoalsAgainst}
            </div>
            <div className="second-element">
              {rank.powerPlayGoalsAgainst}
            </div>
          </div>
          <div className="half-section half-section__fourth">
            <div className="first-element">
              {numbers.penaltyKillPercentage}
            </div>
            <div className="second-element">
              {rank.penaltyKillPercentage}
            </div>
          </div>
        </div>
        <div className="quad-section">
          <div className="half-section half-section__first">
            <div className="first-element">
              {numbers.faceOffsTaken}
            </div>
            <div className="second-element">
              {rank.faceOffsTaken}
            </div>
          </div>
          <div className="half-section half-section__second">
            <div className="first-element">
              {numbers.faceOffsWon}
            </div>
            <div className="second-element">
              {rank.faceOffsWon}
            </div>
          </div>
          <div className="half-section half-section__third">
            <div className="first-element">
              {numbers.faceOffsLost}
            </div>
            <div className="second-element">
              {rank.faceOffsLost}
            </div>
          </div>
          <div className="half-section half-section__fourth">
            <div className="first-element">
              {numbers.faceOffWinPercentage}
            </div>
            <div className="second-element">
              {rank.faceOffWinPercentage}
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
