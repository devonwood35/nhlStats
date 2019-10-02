import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';
import allTeams from '../utils/teams.json';

class RecentGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
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
    let start = new Date();
    const day = String(start.getDate()).padStart(2, '0');
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const year = start.getFullYear();

    start = `${year - 1}-${month}-${day}`;
    const end = `${year}-${month}-${day}`;
    api.loadGames(id, start, end).then((games) => {
      const totalGames = games.data.dates.length - 1;
      const lastFive = [];
      for (let i = totalGames; i > totalGames - 5; i -= 1) {
        lastFive.push(games.data.dates[i]);
      }
      this.setState({
        games: lastFive
      });
    });
  }

  checkWin(data) {
    const { match: { params: { id } } } = this.props;

    // eslint-disable-next-line
    if (data.away.team.id == id) {
      if (data.away.score > data.home.score) {
        return 'W';
      }
      return 'L';
    }
    if (data.home.score > data.away.score) {
      return 'W';
    }
    return 'L';
  }

  render() {
    const { games } = this.state;
    return (
      <div>
        <div className="header-section">Last Five Games</div>
        <div>
          <div className="octo-section list--title">
            <div className="first-element">
              Score
            </div>
            <div className="second-element">
              W/L
            </div>
            <div className="fourth-element">
              Home
            </div>
            <div className="seventh-element">
              Away
            </div>
            <div className="eighth-element">
              Link
            </div>
          </div>
          {games.map((data) => (
            <div className="octo-section list list--large" key={data.games[0].gamePk}>
              <div className="first-element">
                {`${data.games[0].teams.home.score} - ${data.games[0].teams.away.score}`}
              </div>
              <div className="second-element">
                {this.checkWin(data.games[0].teams)}
              </div>
              <div className="third-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((ele) => ele.id == data.games[0].teams.home.team.id).map((team) => (
                  <img className="logo logo__small" src={team.url} alt={team.id} key={team.id} />
                ))}
              </div>
              <div className="fourth-element">
                {data.games[0].teams.home.team.name}
              </div>
              <div className="fifth-element">
                @
              </div>
              <div className="sixth-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((ele) => ele.id == data.games[0].teams.away.team.id).map((team) => (
                  <img className="logo logo__small" src={team.url} alt={team.id} key={team.id} />
                ))}
              </div>
              <div className="seventh-element">
                {data.games[0].teams.away.team.name}
              </div>
              <div className="eighth-element">
                <Link to={`/game/${data.games[0].gamePk}`}>To GameCenter</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

RecentGames.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(RecentGames);
