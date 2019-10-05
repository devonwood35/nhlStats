import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import api from '../utils/api';
import allTeams from '../utils/teams.json';

class YesterdaysGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldGames: []
    };
  }

  componentDidMount() {
    const date = moment().subtract(1, 'days').format().split('T')[0];

    api.loadSchedule(date).then((games) => {
      this.setState({
        oldGames: games.data.dates[0].games
      });
    });
  }

  render() {
    const { oldGames } = this.state;

    return (
      <div>
        <div className="header-section">
          Yesterday&apos;s Games
        </div>
        <div>
          {oldGames.map((game) => (
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
                {game.teams.home.score}
                &nbsp;-&nbsp;
                {game.teams.away.score}
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
                <Link className="header-section header-section--small link-remove" to={`/game/${game.gamePk}/${moment().subtract(1, 'days').format().split('T')[0]}`}>
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

export default withRouter(YesterdaysGames);
