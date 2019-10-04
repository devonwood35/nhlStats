import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import api from '../utils/api';

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
        currentGames: games
      });
    });
  }

  render() {
    const { currentGames } = this.state;
    console.log(currentGames);

    return (
      <div />
    );
  }
}

export default withRouter(UpcomingGames);
