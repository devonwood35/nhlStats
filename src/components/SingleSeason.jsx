import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SingleSeason extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: this.props.player.stats[0].splits, // eslint-disable-line
      statArr: [],
      currentYear: '20192020',
      statYear: {}
    };
  }

  componentDidMount() {
    this.updateSingleSeason();
  }

  changeYear = (event) => {
    this.updateSingleSeason(event.target.getAttribute('value'));
  }

  updateSingleSeason(newYear) {
    const { stats } = this.state;
    let { currentYear } = this.state;
    const { isGoalie } = this.props;

    newYear ? currentYear = newYear : newYear = null; //eslint-disable-line

    let years;
    if (isGoalie) {
      years = stats.filter((year) => year.stat.evenSaves);
      years.forEach((year, index) => {
        if (year.sequenceNumber === 2) {
          // eslint-disable-next-line
          for (const ele in year.stat) {
            years[index - 1].stat[ele] += year.stat[ele]; //eslint-disable-line
          }
          years.splice(index, 1);
        }
      });
      this.setState({
        stats: years,
        statArr: [
          'Games Played', 'Wins', 'Losses', 'OT', 'Shutouts', 'Save %', 'GAA', 'Shots Against', 'Saves', 'Goals Against'
        ],
        currentYear,
        statYear: years.filter((year) => year.season === currentYear)
      });
    } else {
      years = stats.filter((year) => year.stat.shifts);
      years.forEach((year, index) => {
        if (year.sequenceNumber === 2) {
          // eslint-disable-next-line
          for (const ele in year.stat) {
            years[index - 1].stat[ele] += year.stat[ele]; //eslint-disable-line
          }
          years.splice(index, 1);
        }
      });
      this.setState({
        stats: years,
        statArr: [
          'Games Played', 'Goals', 'Assists', 'Points', '+/-', 'Faceoff %', 'Shot %', 'PiM', 'Hits', 'Blocks'
        ],
        currentYear,
        statYear: years.filter((year) => year.season === currentYear)
      });
    }
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
                  <div className="padding-small">{statYear[0].stat.ot}</div>
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

SingleSeason.propTypes = ({
  isGoalie: PropTypes.bool.isRequired,
  player: PropTypes.object.isRequired //eslint-disable-line
});

export default withRouter(SingleSeason);
