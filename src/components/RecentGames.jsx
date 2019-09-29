import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        {games.map((data) => (
          <div>{data.games[0].teams.home.team.name}</div>
        ))}
      </div>
    );
  }
}

export default withRouter(RecentGames);
