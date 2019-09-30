import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {}
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    api.loadPlayer(id).then((stats) => {
      this.setState({
        player: stats.data.people[0]
      });
    });
  }

  render() {
    const { player } = this.state;
    return (
      <div>
        <div>{player.fullName}</div>
      </div>
    );
  }
}

Player.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(Player);
