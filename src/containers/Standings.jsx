import React, { Component } from 'react';
import moment from 'moment';
import api from '../utils/api';
import Division from '../components/Division';
import Conference from '../components/Conference';
import WildCard from '../components/WildCard';
import League from '../components/League';
import Dropdown from '../components/Dropdown';

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      standings: [],
      type: 'byDivision',
      season: '20192020'
    };
  }

  componentDidMount() {
    const { type } = this.state;
    const date = moment().format().split('T')[0];

    api.loadStandings(date, type).then((teams) => {
      this.setState({
        standings: teams.data.records
      });
    });
  }

  changeType = (event) => {
    const type = event.target.getAttribute('value');
    const date = moment().format().split('T')[0];

    api.loadStandings(date, type).then((teams) => {
      this.setState({
        standings: teams.data.records,
        type
      });
    });
  }

  changeSeason = (event) => {
    const season = event.target.value;

    api.loadStandingsOld(season).then((data) => {
      this.setState({
        standings: data.data.records,
        type: 'byDivision',
        season
      });
    });
  }

  chooseType(team) {
    const { type } = this.state;
    switch (type) {
      case 'byDivision':
        return <Division team={team} />;
      case 'byConference':
        return <Conference team={team} />;
      case 'wildCardWithLeaders':
        return <WildCard team={team} />;
      case 'byLeague':
        return <League team={team} />;
      default:
        return <Division team={team} />;
    }
  }

  render() {
    const { standings, season } = this.state;

    if (!standings[0]) { return (<div className="loading padding-large">loading...</div>); }

    return (
      <div className="box-container">
        <div className="header-section header-section--large">
          Standings
        </div>
        <button type="button" onClick={this.changeType} className="btn btn__paginate" value="byDivision">
          Division
        </button>
        {season === '20192020'
          ? (
            <span>
              <button type="button" onClick={this.changeType} className="btn btn__paginate" value="wildCardWithLeaders">
                Wildcard
              </button>
              <button type="button" onClick={this.changeType} className="btn btn__paginate" value="byConference">
                Conference
              </button>
              <button type="button" onClick={this.changeType} className="btn btn__paginate" value="byLeague">
                League
              </button>
            </span>
          )
          : null}
        <Dropdown click={this.changeSeason} />
        {this.chooseType(standings)}
      </div>
    );
  }
}

export default Standings;
