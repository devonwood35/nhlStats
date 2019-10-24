import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../utils/api';

class TeamAllGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      months: [],
      currentMonth: 0
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    api.loadGames(id, '2019-6-1', '2020-6-1').then((game) => {
      const allGames = game.data.dates.filter((type) => type.games[0].gameType !== 'PR');
      const months = [];

      allGames.forEach((data) => {
        if (!months.includes(moment(data.date).format('MMMM'))) {
          months.push(moment(data.date).format('MMMM'));
        }
      });

      this.setState({
        months,
        games: allGames
      });
    });
  }

  changeMonth = (event) => {
    const { currentMonth } = this.state;
    const newMonth = currentMonth + parseInt(event.target.getAttribute('value'), 10);

    this.setState({
      currentMonth: newMonth
    });
  }

  formatTime = (date) => {
    const estTime = moment(date.games[0].gameDate).utcOffset(new
    Date().getTimezoneOffset()).format();

    return moment(estTime).format('LT');
  }

  checkWin(data) {
    const { match: { params: { id } } } = this.props;

    // eslint-disable-next-line
    if (data.status.abstractGameState !== 'Final') {
      return (
        data.status.abstractGameState === 'Live'
          ? <span className="live-marker">Live</span>
          : null
      );
    }
    // eslint-disable-next-line
    if (data.teams.away.team.id == id) {
      if (data.teams.away.score > data.teams.home.score) {
        return 'W';
      }
      return 'L';
    }
    if (data.teams.home.score > data.teams.away.score) {
      return 'W';
    }
    return 'L';
  }

  render() {
    const { games, months, currentMonth } = this.state;

    if (!games[0]) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section tri-section tri-section__navigate">
          {currentMonth !== 0
            ? (
              <div className="first-element">
                { /* eslint-disable-next-line */ }
                <strong className="link" value="-1" onClick={this.changeMonth}>&lt;</strong>
              </div>
            )
            : null}
          <div key={months[currentMonth]} className="second-element">{months[currentMonth]}</div>
          {currentMonth !== months.length - 1
            ? (
              <div className="third-element">
                { /* eslint-disable-next-line */ }
                <strong className="link" value="1" onClick={this.changeMonth}>&gt;</strong>
              </div>
            )
            : null}
        </div>
        <div className="sext-section">
          <div className="first-element list--title">
            Date
          </div>
          <div className="second-element list--title">
            Home
          </div>
          <div className="third-element list--title">
            Score
          </div>
          <div className="fourth-element list--title">
            Result
          </div>
          <div className="fifth-element list--title">
            Away
          </div>
        </div>
        { /* eslint-disable-next-line */ }
        {games.filter((month) => moment(month.date).format('MMMM') == months[currentMonth]).map((game) => (
          <div key={game.games[0].gamePk} className="sext-section game-row list">
            <div className="first-element">
              {moment(game.date).format('Do')}
            </div>
            <div className="second-element">
              {game.games[0].teams.home.team.name}
            </div>
            <div className="third-element">
              {game.games[0].status.abstractGameState === 'Preview'
                ? (
                  this.formatTime(game)
                )
                : (
                  <div>
                    {game.games[0].teams.home.score}
                    &nbsp;-&nbsp;
                    {game.games[0].teams.away.score}
                  </div>
                )}
            </div>
            <div className="fourth-element">
              {this.checkWin(game.games[0])}
            </div>
            <div className="fifth-element">
              {game.games[0].teams.away.team.name}
            </div>
            <div className="sixth-element">
              <Link className="header-section header-section--small link-remove" to={`/game/${game.games[0].gamePk}/${moment().format().split('T')[0]}`}>
                GameCenter
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

TeamAllGames.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(TeamAllGames);
