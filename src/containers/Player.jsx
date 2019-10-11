import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import api from '../utils/api';
import allTeams from '../utils/teams.json';
import PlayerStats from '../components/PlayerStats';
import PlayerGameStats from '../components/PlayerGameStats';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      statCat: 'singleS'
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

  changeCategory = (event) => {
    const category = event.target.value;
    const { match: { params: { id } } } = this.props;

    if (category === 'singleS') {
      api.loadPlayer(id).then((stats) => {
        this.setState({
          player: stats.data.people[0],
          statCat: 'singleS'
        });
      });
    } else if (category === 'careerS') {
      api.loadPlayerCareer(id).then((stats) => {
        this.setState({
          player: stats.data.people[0],
          statCat: 'careerS'
        });
      });
    }
  }

  render() {
    const { player, statCat } = this.state;

    if (!player.primaryPosition) { return (<div className="loading padding-large">loading...</div>); }

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
            <div className="padding-small">{`#${player.primaryNumber}`}</div>
          </div>
          <div className="third-element">
            <div className="list--title">Position</div>
            <div className="padding-small">{player.primaryPosition.name}</div>
          </div>
          <div className="fourth-element">
            <div className="list--title">Shoots/Catches</div>
            <div className="padding-small">{player.shootsCatches}</div>
          </div>
        </div>
        <div className="quad-section list">
          <div className="first-element">
            <div className="list--title">Nationality</div>
            <div className="padding-small">{player.birthCountry}</div>
          </div>
          <div className="second-element">
            <div className="list--title">Age</div>
            <div className="padding-small">{player.currentAge}</div>
          </div>
          <div className="third-element">
            <div className="list--title">Height</div>
            <div className="padding-small">{player.height}</div>
          </div>
          <div className="fourth-element">
            <div className="list--title">Weight</div>
            <div className="padding-small">{player.weight}</div>
          </div>
        </div>
        <br />
        <div className="quad-section header-section remove header-section--shift header-section--black">
          <button type="button" onClick={this.changeCategory} value="singleS" className="first-element list--title header-section--small btn btn__player-stats">
            Single Season
          </button>
          <button type="button" onClick={this.changeCategory} value="singleP" className="second-element list--title header-section--small btn btn__player-stats">
            Single Playoffs
          </button>
          <button type="button" onClick={this.changeCategory} value="careerS" className="third-element list--title header-section--small btn btn__player-stats">
            Career Season
          </button>
          <button type="button" onClick={this.changeCategory} value="careerP" className="fourth-element list--title header-section--small btn btn__player-stats">
            Career Playoffs
          </button>
        </div>
        { /* eslint-disable-next-line */ }
        <PlayerStats isGoalie={player.primaryPosition.code === 'G' ? true : false} player={player.stats[0].splits} category={statCat} />
        { /* eslint-disable-next-line */ }
        <PlayerGameStats isGoalie={player.primaryPosition.code === 'G' ? true : false} />
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
