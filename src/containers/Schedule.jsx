import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import teamLogos from '../utils/logos';
import api from '../utils/api';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      day: moment().format().split('T')[0]
    };
  }

  componentDidMount() {
    const { day } = this.state;

    api.loadSchedule(day).then((newDay) => {
      this.setState({
        schedule: newDay.data.dates[0].games
      });
    });
  }

  changeDay = (event) => {
    const { day } = this.state;
    const newDate = moment(day).add(event.target.getAttribute('value'), 'day').format().split('T')[0];

    api.loadSchedule(newDate).then((newDay) => {
      this.setState({
        schedule: newDay.data.dates[0].games
      });
    });

    this.setState({
      day: newDate
    });
  }

  formatTime = (date) => {
    const estTime = moment(date.gameDate).utcOffset(new Date().getTimezoneOffset()).format();

    return moment(estTime).format('LT');
  }

  render() {
    const { schedule, day } = this.state;

    return (
      <div className="box-container">
        <div className="tri-section tri-section__navigate">
          <div className="first-element center--grid">
            <div className="link header-section--large">
              { /* eslint-disable-next-line */ }
              <strong onClick={this.changeDay} value="-1">&lt;</strong>
            </div>
          </div>
          <div className="second-element header-section">
            {moment(day, 'YYYY-MM-DD').format('LL')}
          </div>
          <div className="third-element center--grid">
            <div className="link header-section--large">
              { /* eslint-disable-next-line */ }
              <strong onClick={this.changeDay} value="1">&gt;</strong>
            </div>
          </div>
        </div>
        <div>
          {schedule.map((game) => (
            <div key={game.gamePk} className="sext-section game-row list">
              <div className="first-element">
                { /* eslint-disable-next-line */ }
                {teamLogos.filter((team) => team.id == game.teams.home.team.id).map((logo) => (
                  <img key={logo.id} src={logo.url} alt={logo.id} className="logo__xs" />
                ))}
              </div>
              <div className="second-element">
                {game.teams.home.team.name}
              </div>
              <div className="third-element">
                {game.status.abstractGameState === 'Preview'
                  ? (
                    this.formatTime(game)
                  )
                  : (
                    <div>
                      {game.teams.home.score}
                      &nbsp;-&nbsp;
                      {game.teams.away.score}
                      &nbsp;
                      {game.status.abstractGameState === 'Live'
                        ? <span className="live-marker">Live</span>
                        : null}
                    </div>
                  )}
              </div>
              <div className="fourth-element">
                { /* eslint-disable-next-line */ }
                {teamLogos.filter((team) => team.id == game.teams.away.team.id).map((logo) => (
                  <img key={logo.id} src={logo.url} alt={logo.id} className="logo__xs" />
                ))}
              </div>
              <div className="fifth-element">
                {game.teams.away.team.name}
              </div>
              <div className="sixth-element">
                <Link className="header-section header-section--small link-remove" to={`/game/${game.gamePk}/${moment().format().split('T')[0]}`}>
                  GameCenter
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Schedule);
