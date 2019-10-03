import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import api from '../utils/api';
import allTeams from '../utils/teams.json';
import PlayerStats from '../components/PlayerStats';

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

  isCaptain = (state) => {
    if (state.captain) {
      return `${state.fullName} (C)`;
    }
    if (state.alternateCaptain) {
      return `${state.fullName} (A)`;
    }
    return state.fullName;
  }

  render() {
    const { player } = this.state;

    if (!player.primaryPosition) { return (<div>loading...</div>); }

    const logo = allTeams.teams.filter((ele) => ele.id == player.currentTeam.id); //eslint-disable-line

    return (
      <div className="box-container">
        <Link to={`/${player.currentTeam.id}/roster`} className="header-section header-section--shift link-remove padding-small">
          <FontAwesomeIcon icon="angle-double-left" />
          &nbsp;Roster
        </Link>
        <div className="header-section header-section--large">
          {this.isCaptain(player)}
        </div>
        <div className="quad-section list">
          <div className="first-element">
            <div className="list--title">Current Team</div>
            <img className="logo__xs" src={logo[0].url} alt={logo[0].id} />
          </div>
          <div className="second-element">
            <div className="list--title">Number</div>
            <div>{`#${player.primaryNumber}`}</div>
          </div>
          <div className="third-element">
            <div className="list--title">Position</div>
            <div>{player.primaryPosition.name}</div>
          </div>
          <div className="fourth-element">
            <div className="list--title">Shoots/Catches</div>
            <div>{player.shootsCatches}</div>
          </div>
        </div>
        <div className="quad-section list">
          <div className="first-element">
            <div className="list--title">Nationality</div>
            <div>{player.birthCountry}</div>
          </div>
          <div className="second-element">
            <div className="list--title">Age</div>
            <div>{player.currentAge}</div>
          </div>
          <div className="third-element">
            <div className="list--title">Height</div>
            <div>{player.height}</div>
          </div>
          <div className="fourth-element">
            <div className="list--title">Weight</div>
            <div>{player.weight}</div>
          </div>
        </div>
        <div className="header-section">
          Stats
        </div>
        { /* eslint-disable-next-line */ }
        <PlayerStats isGoalie={player.primaryPosition.code === 'G' ? true : false} player={player.stats[0].splits} />
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
