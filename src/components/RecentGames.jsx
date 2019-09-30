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

  render() {
    const { games } = this.state;
    return (
      <div>
        <div className="header-section">Last Five Games</div>
        <div className="sub-container">
          <div className="octo-section list--black">
            <div className="second-element">
              Home
            </div>
            <div className="third-element">
              Score
            </div>
            <div className="sixth-element">
              Away
            </div>
            <div className="seventh-element">
              Score
            </div>
            <div className="eighth-element">
              Link
            </div>
          </div>
          {games.map((data) => (
            <div className="octo-section list list--large" key={data.games[0].gamePk}>
              <div className="first-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((ele) => ele.id == data.games[0].teams.away.team.id).map((team) => (
                  <img className="logo logo__small" src={team.url} alt={team.id} key={team.id} />
                ))}
              </div>
              <div className="second-element">
                {data.games[0].teams.home.team.name}
              </div>
              <div className="third-element">
                {data.games[0].teams.home.score}
              </div>
              <div className="fourth-element">
                at
              </div>
              <div className="fifth-element">
                { /* eslint-disable-next-line */ }
                {allTeams.teams.filter((ele) => ele.id == data.games[0].teams.away.team.id).map((team) => (
                  <img className="logo logo__small" src={team.url} alt={team.id} key={team.id} />
                ))}
              </div>
              <div className="sixth-element">
                {data.games[0].teams.away.team.name}
              </div>
              <div className="seventh-element">
                {data.games[0].teams.away.score}
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
