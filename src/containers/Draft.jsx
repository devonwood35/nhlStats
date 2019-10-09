import React, { Component } from 'react';
import api from '../utils/api';
import allTeams from '../utils/teams.json';

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '2019',
      players: [],
      round: 0
    };
  }

  componentDidMount() {
    const { year } = this.state;

    api.loadDraft(year).then((data) => {
      this.setState({
        players: data.data.drafts[0].rounds
      });
    });
  }

  changeYear = (event) => {
    const { round } = this.state;
    const yearValue = event.target.getAttribute('value');

    // eslint-disable-next-line
    const newRound = parseInt(round) + parseInt(yearValue);

    this.setState({
      round: newRound
    });
    return true;
  }

  render() {
    const { year, players, round } = this.state;

    if (!players[0]) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section header-section--large align__left">
          {year}
          &nbsp;Draft
        </div>
        <div className="header-section quint-section quint-section__centered">
          {round === 0
            ? null
            : (
              /* eslint-disable-next-line */
              <div className="second-element link" onClick={this.changeYear} value="-1">
                &lt;
              </div>
            )}
          <div className="third-element">
            Round&nbsp;
            {round + 1}
          </div>
          {round >= players.length - 1
            ? null
            : (
              /* eslint-disable-next-line */
              <div className="fourth-element link" onClick={this.changeYear} value="1">
                &gt;
              </div>
            )}
        </div>
        <div className="quint-section">
          <div className="second-element list--title">
            Team
          </div>
          <div className="third-element list--title">
            Player
          </div>
          <div className="fourth-element list--title">
            Pick in Round
          </div>
          <div className="fifth-element list--title">
            Overall Pick
          </div>
        </div>
        {players[round].picks.map((player) => (
          <div className="quint-section center--grid list">
            <div className="first-element">
              { /* eslint-disable-next-line */ }
              {allTeams.teams.filter((id) => id.id == player.team.id).map((logo) => (
                <img className="logo logo__xs" src={logo.url} alt={logo.id} />
              ))}
            </div>
            <div className="second-element">
              {player.team.name}
            </div>
            <div className="third-element">
              {player.prospect.fullName}
            </div>
            <div className="fourth-element">
              {player.pickInRound}
            </div>
            <div className="fifth-element">
              {player.pickOverall}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Draft;
