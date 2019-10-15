import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class SinglePlayoffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.player.stats[0].splits, // eslint-disable-line
      statArr: [],
      currentYear: '20182019',
      statYear: {}
    };
  }

  componentDidMount() {
    this.updateSinglePlayoffs();
  }

  changeYear = (event) => {
    this.updateSinglePlayoffs(event.target.getAttribute('value'));
  }

  updateSinglePlayoffs(newYear) {
    const { match: { params: { id } }, isGoalie } = this.props;
    let { currentYear } = this.state;

    newYear ? currentYear = newYear : newYear = null; //eslint-disable-line

    api.loadPlayerPlayoffsSingle(id).then((data) => {
      const nhlStats = data.data.people[0].stats[0].splits.filter((nhl) => nhl.league.id === 133);

      if (isGoalie) {
        this.setState({
          stats: nhlStats,
          statArr: [
            'Games Played', 'Wins', 'Losses', 'OT', 'Shutouts', 'Save %', 'GAA', 'Shots Against', 'Saves', 'Goals Against'
          ],
          statYear: nhlStats.filter((year) => year.season === currentYear)
        });
      } else {
        this.setState({
          stats: nhlStats,
          statArr: [
            'Games Played', 'Goals', 'Assists', 'Points', '+/-', 'Faceoff %', 'Shot %', 'PiM', 'Hits', 'Blocks'
          ],
          statYear: nhlStats.filter((year) => year.season === currentYear)
        });
      }
    });
  }

  render() {
    const { stats, statArr, statYear } = this.state;
    const { isGoalie } = this.props;

    if (!statYear[0]) { return (<div className="loading padding-large">No Games Played</div>); }

    return (
      <div>
        <div className="paginate">
          {stats.map((year) => (
            <button className="btn btn__paginate" type="button" key={year.season} onClick={this.changeYear} value={year.season}>
              {year.season}
            </button>
          )).reverse()}
        </div>
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
                  <div className="padding-small">{statYear[0].stat.games}</div>
                  <div className="padding-small">{statYear[0].stat.wins}</div>
                  <div className="padding-small">{statYear[0].stat.losses}</div>
                  <div className="padding-small">{statYear[0].stat.ot || 0 }</div>
                  <div className="padding-small">{statYear[0].stat.shutouts}</div>
                </div>
              )
              : (
                <div>
                  <div className="padding-small">{statYear[0].stat.games}</div>
                  <div className="padding-small">{statYear[0].stat.goals}</div>
                  <div className="padding-small">{statYear[0].stat.assists}</div>
                  <div className="padding-small">{statYear[0].stat.points}</div>
                  <div className="padding-small">{statYear[0].stat.plusMinus}</div>
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
                  <div className="padding-small">{statYear[0].stat.savePercentage}</div>
                  <div className="padding-small">{statYear[0].stat.goalAgainstAverage}</div>
                  <div className="padding-small">{statYear[0].stat.shotsAgainst}</div>
                  <div className="padding-small">{statYear[0].stat.saves}</div>
                  <div className="padding-small">{statYear[0].stat.goalsAgainst}</div>
                </div>
              )
              : (
                <div>
                  <div className="padding-small">{`${statYear[0].stat.faceOffPct}%`}</div>
                  <div className="padding-small">{`${statYear[0].stat.shotPct}%`}</div>
                  <div className="padding-small">{statYear[0].stat.penaltyMinutes}</div>
                  <div className="padding-small">{statYear[0].stat.hits}</div>
                  <div className="padding-small">{statYear[0].stat.blocked}</div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

SinglePlayoffs.propTypes = ({
  isGoalie: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired, //eslint-disable-line
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(SinglePlayoffs);
