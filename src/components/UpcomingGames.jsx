import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../utils/api';
import allTeams from '../utils/teams.json';

class UpcomingGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGames: []
    };
  }

  componentDidMount() {
    const date = moment().format().split('T')[0];

    api.loadSchedule(date).then((games) => {
      this.setState({
        currentGames: games.data.dates[0].games
      });
    });
  }

  formatTime = (date) => {
    const estTime = moment(date.gameDate).utcOffset(new Date().getTimezoneOffset()).format();

    return moment(estTime).format('LT');
  }

  render() {
    const { currentGames } = this.state;

    return (
      <div>
        <div className="header-section">
          Today&apos;s Games
        </div>
        <div>
          {currentGames.map((game) => (
            <div key={game.gamePk} className="sext-section game-row list">
              <div className="first-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((team) => team.id == game.teams.home.team.id).map((logo) => (
                  <img key={logo.id} src={logo.url} alt={logo.id} className="logo__xs" />
                ))}
              </div>
              <div className="second-element">
                {game.teams.home.team.name}
              </div>
              <div className="third-element">
                {game.status.abstractGameState === 'Preview'
                  ? (
                    this.formatTime(game)
                  )
                  : (
                    <div>
                      {game.teams.home.score}
                      &nbsp;-&nbsp;
                      {game.teams.away.score}
                      &nbsp;
                      {game.status.abstractGameState === 'Live'
                        ? <span className="live-marker">Live</span>
                        : null}
                    </div>
                  )}
              </div>
              <div className="fourth-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((team) => team.id == game.teams.away.team.id).map((logo) => (
                  <img key={logo.id} src={logo.url} alt={logo.id} className="logo__xs" />
                ))}
              </div>
              <div className="fifth-element">
                {game.teams.away.team.name}
              </div>
              <div className="sixth-element">
                <Link className="header-section header-section--small link-remove" to={`/game/${game.gamePk}/${moment().format().split('T')[0]}`}>
                  GameCenter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(UpcomingGames);
