import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../utils/api';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: []
    }
  }

  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    api.loadGame(id).then((data) => {
      this.setState({
        game: data.data
      })
    })
  }

  render() {
    const { game } = this.state;
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

export default withRouter(Game);
