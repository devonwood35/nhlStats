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
    if (!player.primaryPosition) { return (<div>loading...</div>)};

    return (
      <div>
        <div className="half-section">
          <div className="first-element">{player.fullName}</div>
          <div className="second-element half-section">
            <div className="first-element">
              <div>Position</div>
              <div>Number</div>
              <div>Nationality</div>
              <div>Birthday</div>
              <div>Height</div>
              <div>Weight</div>
              <div>Age</div>
            </div>
            <div className="second-element">
              <div>{player.primaryPosition.name}</div>
              <div>{player.primaryNumber}</div>
              <div>{player.birthCountry}</div>
              <div>{player.birthDate}</div>
              <div>{player.height}</div>
              <div>{player.weight}</div>
              <div>{player.currentAge}</div>
            </div>
          </div>
        </div>
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
