import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class RecentGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    let start = new Date();
    let day = String(start.getDate()).padStart(2, '0');
    let month = String(start.getMonth() + 1).padStart(2, '0');
    let year = start.getFullYear();

    start = `${year-1}-${month}-${day}`;
    let end = `${year}-${month}-${day}`;
    api.loadGames(id, start, end).then((games) => {
      const totalGames = games.data.dates.length - 1;
      let lastFive = [];
      for (let i = totalGames; i > totalGames - 5; i--) {
        lastFive.push(games.data.dates[i]);
      }
      this.setState({
        games: lastFive
      });
    })
  }

  render() {
    const { games } = this.state;
    return (
      <div>
        <div className="header-section">Last Five Games</div>
        <div className="octo-section">
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
          <div className="octo-section">
            <div className="first-element">

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
    );
  }
}

export default withRouter(RecentGames);
