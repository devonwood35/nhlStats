import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import api from '../utils/api';
import teamLogos from '../utils/logos';
import PlayerGameStats from '../components/PlayerGameStats';
import SingleSeason from '../components/SingleSeason';
import SinglePlayoffs from '../components/SinglePlayoffs';
import CareerSeason from '../components/CareerSeason';
import CareerPlayoffs from '../components/CareerPlayoffs';

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

    if (category === 'singleS') {
      this.setState({
        statCat: 'singleS'
      });
    } else if (category === 'careerS') {
      this.setState({
        statCat: 'careerS'
      });
    } else if (category === 'singleP') {
      this.setState({
        statCat: 'singleP'
      });
    } else if (category === 'careerP') {
      this.setState({
        statCat: 'careerP'
      });
    }
  }

  currentCategory = (player) => {
    const { statCat } = this.state;

    switch (statCat) {
      case 'singleS':
        return <SingleSeason isGoalie={player.primaryPosition.code === 'G'} player={player} />;
      case 'singleP':
        return <SinglePlayoffs isGoalie={player.primaryPosition.code === 'G'} player={player} />;
      case 'careerS':
        return <CareerSeason isGoalie={player.primaryPosition.code === 'G'} />;
      case 'careerP':
        return <CareerPlayoffs isGoalie={player.primaryPosition.code === 'G'} />;
      default:
        return <SingleSeason isGoalie={player.primaryPosition.code === 'G'} player={player} />;
    }
  }

  render() {
    const { player } = this.state;
    const { match: { params: { id } } } = this.props;

    if (!player.primaryPosition) { return (<div className="loading padding-large">loading...</div>); }

    const isGoalie = player.primaryPosition.code === 'G';

    const logo = teamLogos.filter((ele) => ele.id == player.currentTeam.id); //eslint-disable-line

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
        {this.currentCategory(player)}
        { /* eslint-disable-next-line */ }
        <PlayerGameStats isGoalie={player.primaryPosition.code === 'G'} />
        { /* eslint-disable-next-line */ }
        <Link to={{pathname: `/all_games_player/${id}`, state: isGoalie}} className="link-remove">
          <div className="header-section">
            All Games
          </div>
        </Link>
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
