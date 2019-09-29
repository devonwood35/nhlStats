import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../utils/api';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    api.loadGame(id).then((data) => {
      this.setState({
        game: data.data
      });
    });
  }

  render() {
    const { game } = this.state;
    console.log(game);
    return (
      <div className="half-section">
        <div className="first-element">
          Home
        </div>
        <div className="second-element">
          Away
        </div>
      </div>
    );
  }
}

Game.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(Game);
