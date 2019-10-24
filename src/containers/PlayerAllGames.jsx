import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import api from '../utils/api';
import teamLogos from '../utils/logos';

class PlayerAllGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      logos: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    api.loadGameStats(id, '20192020').then((game) => {
      const logoArray = [];
      const newGame = game.data.people[0].stats[0].splits;

      newGame.forEach((team) => {
        if (team.isHome) {
          const home = teamLogos.filter((logo) => team.team.id == logo.id); // eslint-disable-line
          const away = teamLogos.filter((logo) => team.opponent.id == logo.id); // eslint-disable-line

          logoArray.push({
            home: home[0].url,
            away: away[0].url
          });
        } else {
          const away = teamLogos.filter((logo) => team.team.id == logo.id); // eslint-disable-line
          const home = teamLogos.filter((logo) => team.opponent.id == logo.id); // eslint-disable-line

          logoArray.push({
            home: home[0].url,
            away: away[0].url
          });
        }
      });

      this.setState({
        games: newGame,
        logos: logoArray
      });
    });
  }

  render() {
    const { games, logos } = this.state;
    const { location: { state } } = this.props;

    if (!games[0]) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section">
          All Games
        </div>
        {games.map((game, index) => (
          <div key={game.date}>
            <div className="quad-section quad-section__side-margin list">
              <div className="second-element">
                <div className="list--title padding-small">Home</div>
                <img src={logos[index].home} alt="home" className="logo__xs center" />
              </div>
              <div className="third-element">
                <div className="list--title padding-small">Away</div>
                <img src={logos[index].away} alt="away" className="logo__xs fourth-element center" />
              </div>
            </div>
            {state
              ? (
                <div className="sept-section">
                  <div className="first-element">
                    <div className="padding-small list--title">Date</div>
                    <div className="padding-small">{moment(game.date, 'YYYY-MM-DD').format('ll')}</div>
                  </div>
                  <div className="second-element">
                    <div className="padding-small list--title">Shots Against</div>
                    <div className="padding-small">{game.stat.shotsAgainst}</div>
                  </div>
                  <div className="third-element">
                    <div className="padding-small list--title">Saves</div>
                    <div className="padding-small">{game.stat.saves}</div>
                  </div>
                  <div className="fourth-element">
                    <div className="padding-small list--title">Save %</div>
                    <div className="padding-small">{game.stat.savePercentage}</div>
                  </div>
                  <div className="fifth-element">
                    <div className="padding-small list--title">Goals Against</div>
                    <div className="padding-small">{game.stat.goalsAgainst}</div>
                  </div>
                  <div className="sixth-element">
                    <div className="padding-small list--title">Time on Ice</div>
                    <div className="padding-small">{game.stat.timeOnIce}</div>
                  </div>
                  <div className="seventh-element">
                    <Link to={`/game/${game.game.gamePk}/${game.date}`} className="padding-small header-section header-section--small link-remove">GameCenter</Link>
                  </div>
                </div>
              )
              : (
                <div className="dec-section">
                  <div className="first-element">
                    <div className="padding-small list--title">Date</div>
                    <div className="padding-small">{moment(game.date, 'YYYY-MM-DD').format('ll')}</div>
                  </div>
                  <div className="second-element">
                    <div className="padding-small list--title">Goals</div>
                    <div className="padding-small">{game.stat.goals}</div>
                  </div>
                  <div className="third-element">
                    <div className="padding-small list--title">Assists</div>
                    <div className="padding-small">{game.stat.assists}</div>
                  </div>
                  <div className="fourth-element">
                    <div className="padding-small list--title">Points</div>
                    <div className="padding-small">{game.stat.points}</div>
                  </div>
                  <div className="fifth-element">
                    <div className="padding-small list--title">+/-</div>
                    <div className="padding-small">{game.stat.plusMinus}</div>
                  </div>
                  <div className="sixth-element">
                    <div className="padding-small list--title">Shots</div>
                    <div className="padding-small">{game.stat.shots}</div>
                  </div>
                  <div className="seventh-element">
                    <div className="padding-small list--title">Hits</div>
                    <div className="padding-small">{game.stat.hits}</div>
                  </div>
                  <div className="eigth-element">
                    <div className="padding-small list--title">PiM</div>
                    <div className="padding-small">{game.stat.pim}</div>
                  </div>
                  <div className="nineth-element">
                    <div className="padding-small list--title">Time on Ice</div>
                    <div className="padding-small">{game.stat.timeOnIce}</div>
                  </div>
                  <div className="tenth-element">
                    <Link to={`/game/${game.game.gamePk}/${game.date}`} className="padding-small header-section header-section--small link-remove">GameCenter</Link>
                  </div>
                </div>
              )}
          </div>
        ))}
      </div>
    );
  }
}

PlayerAllGames.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.bool.isRequired
  }).isRequired
});

export default withRouter(PlayerAllGames);
