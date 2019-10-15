import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class CareerSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      statArr: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, isGoalie } = this.props;

    api.loadPlayerCareer(id).then((data) => {
      this.setState({
        stats: data.data.people[0].stats[0].splits[0].stat,
        statArr: isGoalie ? [
          'Games Played', 'Wins', 'Losses', 'OT', 'Shutouts', 'Save %', 'GAA', 'Shots Against', 'Saves', 'Goals Against'
        ]
          : [
            'Games Played', 'Goals', 'Assists', 'Points', '+/-', 'Faceoff %', 'Shot %', 'PiM', 'Hits', 'Blocks'
          ]
      });
    });
  }

  render() {
    const { statArr, stats } = this.state;
    const { isGoalie } = this.props;

    return (
      <div>
        <div className="quad-section list">
          <div className="first-element">
            <div className="list--title padding-small">{statArr[0]}</div>
            <div className="list--title padding-small">{statArr[1]}</div>
            <div className="list--title padding-small">{statArr[2]}</div>
            <div className="list--title padding-small">{statArr[3]}</div>
            <div className="list--title padding-small">{statArr[4]}</div>
          </div>
          <div className="second-element">
            {isGoalie
              ? (
                <div>
                  <div className="padding-small">{stats.games}</div>
                  <div className="padding-small">{stats.wins}</div>
                  <div className="padding-small">{stats.losses}</div>
                  <div className="padding-small">{stats.ot}</div>
                  <div className="padding-small">{stats.shutouts}</div>
                </div>
              )
              : (
                <div>
                  <div className="padding-small">{stats.games}</div>
                  <div className="padding-small">{stats.goals}</div>
                  <div className="padding-small">{stats.assists}</div>
                  <div className="padding-small">{stats.points}</div>
                  <div className="padding-small">{stats.plusMinus}</div>
                </div>
              )}
          </div>
          <div className="third-element">
            <div className="list--title padding-small">{statArr[5]}</div>
            <div className="list--title padding-small">{statArr[6]}</div>
            <div className="list--title padding-small">{statArr[7]}</div>
            <div className="list--title padding-small">{statArr[8]}</div>
            <div className="list--title padding-small">{statArr[9]}</div>
          </div>
          <div className="fourth-element">
            {isGoalie
              ? (
                <div>
                  <div className="padding-small">{stats.savePercentage}</div>
                  <div className="padding-small">{stats.goalAgainstAverage}</div>
                  <div className="padding-small">{stats.shotsAgainst}</div>
                  <div className="padding-small">{stats.saves}</div>
                  <div className="padding-small">{stats.goalsAgainst}</div>
                </div>
              )
              : (
                <div>
                  <div className="padding-small">{`${stats.faceOffPct}%`}</div>
                  <div className="padding-small">{`${stats.shotPct}%`}</div>
                  <div className="padding-small">{stats.penaltyMinutes}</div>
                  <div className="padding-small">{stats.hits}</div>
                  <div className="padding-small">{stats.blocked}</div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

CareerSeason.propTypes = {
  isGoalie: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default withRouter(CareerSeason);
