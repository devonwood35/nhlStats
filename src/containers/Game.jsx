import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import allTeams from '../utils/teams.json';
import api from '../utils/api';
import Period from '../components/Period';
import GameStats from '../components/GameStats';

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
    const { match: { params: { date } } } = this.props;

    if (!game.gameData) { return (<div>loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section">
          {moment(date, 'YYYY-MM-DD').format('LL')}
        </div>
        <div className="tri-section">
          <div className="first-element">
            <div className="header-section">Home</div>
            { /* eslint-disable-next-line */ }
            {allTeams.teams.filter((team) => game.gameData.teams.home.id == team.id).map((logo) => (
              <img key={logo.id} src={logo.url} alt="Home" className="logo logo__small" />
            ))}
          </div>
          <div className="second-element header-section header-section--large center--grid">
            <br />
            {game.liveData.linescore.teams.home.goals}
            -
            {game.liveData.linescore.teams.away.goals}
            &nbsp;
            {game.liveData.linescore.currentPeriod === 4 ? 'OT' : null}
            {game.liveData.linescore.currentPeriod === 5 ? 'SO' : null}
            {game.gameData.status.abstractGameState === 'Live'
              ? (
                <div>
                  <div className="live-marker">Live</div>
                  <div className="header-section list--title">
                    {`${game.liveData.linescore.currentPeriodOrdinal} Period`}
                    &nbsp;
                    {game.liveData.linescore.currentPeriodTimeRemaining}
                  </div>
                </div>
              )
              : null}
          </div>
          <div className="third-element">
            <div className="header-section">Away</div>
            { /* eslint-disable-next-line */ }
            {allTeams.teams.filter((team) => game.gameData.teams.away.id == team.id).map((logo) => (
              <img key={logo.id} src={logo.url} alt="Home" className="logo logo__small" />
            ))}
          </div>
        </div>
        <GameStats liveData={game.liveData} />
        <Period liveData={game.liveData} />
      </div>
    );
  }
}

Game.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
});

export default withRouter(Game);
